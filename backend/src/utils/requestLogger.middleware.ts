import { Request, Response, NextFunction } from 'express';

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Skip logging OPTIONS requests (CORS preflight)
  if (req.method === 'OPTIONS') {
    return next();
  }

  const startTime = Date.now();

  // Store the original end method
  const originalEnd = res.end;

  // Override the end method to capture when the response is finished
  res.end = function (chunk?: any, encoding?: any): Response {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Extract request IDs from header
    const requestIds = req.headers['x-request-ids'] as string;

    // Log the request details
    const logEntry = {
      status: res.statusCode,
      method: req.method,
      endpoint: req.originalUrl || req.url,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      requestIds: requestIds || 'N/A',
    };

    // Format the log message
    const statusColor = getStatusColor(res.statusCode);
    const resetColor = '\x1b[0m';
    const idsInfo = requestIds ? ` [${requestIds}]` : '';
    console.log(
      `${logEntry.timestamp} ${statusColor}${logEntry.status}${resetColor} ${logEntry.method} ${logEntry.endpoint} - ${logEntry.duration}${idsInfo}`,
    );

    // If it's a 500 error, we should log additional error details
    // Note: The actual error logging is handled by the errorHandler middleware
    if (res.statusCode >= 500) {
      const errorIdsInfo = requestIds ? ` [${requestIds}]` : '';
      console.error(
        `[ERROR] Server error occurred for ${logEntry.method} ${logEntry.endpoint}${errorIdsInfo}`,
      );
    }

    // Call the original end method
    return originalEnd.call(this, chunk, encoding) as Response;
  };

  next();
}

function getStatusColor(statusCode: number): string {
  if (statusCode >= 500) return '\x1b[31m'; // Red
  if (statusCode >= 400) return '\x1b[33m'; // Yellow
  if (statusCode >= 300) return '\x1b[36m'; // Cyan
  if (statusCode >= 200) return '\x1b[32m'; // Green
  return '\x1b[37m'; // White
}

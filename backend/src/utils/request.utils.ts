import { Request } from 'express';

export interface PaginationQuery {
  orderBy?: any;
  take?: number;
  cursor?: any;
  skip?: number;
  where?: any;
  select?: any;
  include?: any;
}
export function getPaginationQuery(
  req: Request,
  options: PaginationQuery,
): PaginationQuery {
  const { cursor, orderBy, orderDirection } = req.query;
  const orderedBy = getOrderBy(orderBy);
  const direction = getOrderDirection(orderDirection);

  const queryOptions: any = {
    orderBy: { [orderedBy]: direction },
    take: 100,
  };

  if (cursor) {
    queryOptions.cursor = { [orderedBy]: cursor };
    queryOptions.skip = 1;
  }

  return {
    ...queryOptions,
    ...options,
  } as PaginationQuery;
}

function getOrderBy(reqOrderBy: any) {
  const orderedBy = Array.isArray(reqOrderBy) ? reqOrderBy[0] : reqOrderBy;
  return orderedBy || 'id';
}

function getOrderDirection(reqDirection: any) {
  const direction = Array.isArray(reqDirection)
    ? reqDirection[0]
    : reqDirection;

  if (direction === 'asc' || direction === 'desc') {
    return direction;
  }
  return 'asc';
}

export function filterAttributes(payload: any, attributes: string[]) {
  return attributes.reduce((acc, key) => {
    if (payload[key] !== undefined) {
      acc[key] = payload[key];
    }
    return acc;
  }, {});
}

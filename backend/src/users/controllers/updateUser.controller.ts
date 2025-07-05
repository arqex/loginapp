import { Response } from 'express';
import { updateUserMetaFields } from '../users.db';
import { AuthRequest } from '../../auth/auth.types';
import { resError } from '../../utils/respond.utils';

export async function updateUserController(req: AuthRequest, res: Response) {
  const userId = req.params.id;
  const updateData = req.body;

  // Validate that we have some data to update
  if (!updateData || Object.keys(updateData).length === 0) {
    return resError(res, 'no_update_data', 400);
  }

  // Define allowed fields that map to meta properties
  const allowedMetaFields = ['name', 'picURL'];
  const metaUpdates: any = {};

  // Check for individual meta field updates
  for (const field of allowedMetaFields) {
    if (updateData[field] !== undefined) {
      metaUpdates[field] = updateData[field];
    }
  }

  // Check if there's actually something to update
  if (Object.keys(metaUpdates).length === 0) {
    return resError(res, 'no_valid_update_fields', 400);
  }

  try {
    const user = await updateUserMetaFields(userId, metaUpdates);
    if (!user) {
      return resError(res, 'user_not_found', 404);
    }

    // Return empty body with 204 status
    return res.status(204).send();
  } catch (error) {
    console.error('Error updating user:', error);
    return resError(res, 'update_failed', 500);
  }
}

import { Response } from 'express';
import { updateUser, getUserById } from '../users.db';
import { AuthRequest } from '../../auth/auth.types';
import { resError } from '../../../../utils/respond.utils';

export async function updateUserClientDataController(
  req: AuthRequest,
  res: Response,
) {
  const userId = req.params.id;
  const { clientData } = req.body;

  // Validate that clientData is an object
  if (
    clientData !== null &&
    (typeof clientData !== 'object' || Array.isArray(clientData))
  ) {
    return resError(res, 'invalid_client_data', 400);
  }

  try {
    // Update the user's clientData
    await updateUser(userId, { clientData });

    // Fetch the updated user to return the current state
    const user = await getUserById(userId);
    if (!user) {
      return resError(res, 'user_not_found', 404);
    }

    const { meta, clientData: updatedClientData, ...userWithoutMeta } = user;

    res.status(204).send();
  } catch (error) {
    return resError(res, 'update_failed', 500);
  }
}

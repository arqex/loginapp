import type { Request, Response } from 'express';
import { deleteAccountMember } from '../../userRole/userRole.db';

export const deleteAccountMemberController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { accountId, userId } = req.params;

    // Delete the user from the account
    await deleteAccountMember(userId, accountId);

    res.status(200).json({
      success: true,
      message: 'User removed from account successfully',
    });
  } catch (error) {
    console.error('Error removing user from account:', error);
    res.status(500).json({
      error: 'Failed to remove user from account',
    });
  }
};

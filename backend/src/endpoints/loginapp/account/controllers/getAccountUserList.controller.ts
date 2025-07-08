import { Response } from 'express';
import { AuthRequest } from '../../auth/auth.types';
import { getAccountUsersWithRolesPaginated } from '../../userRole/userRole.db';
import { getPaginationQuery } from '../../../../utils/request.utils';
import { getPaginationResponse } from '../../../../utils/respond.utils';

export async function getAccountUserListController(
  req: AuthRequest,
  res: Response,
) {
  const { accountId } = req.params;

  const query = getPaginationQuery(req, {
    orderBy: { updatedAt: 'desc' },
  });

  const usersWithRoles = await getAccountUsersWithRolesPaginated(
    accountId,
    query,
  );

  // Transform the data to include only specific user fields and role
  const transformedUsers = usersWithRoles.map((userAccount) => ({
    id: userAccount.user.id,
    name: (userAccount.user.meta as any)?.name || '',
    role: userAccount.role,
    createdAt: userAccount.createdAt,
    updatedAt: userAccount.updatedAt,
  }));

  return res.json(getPaginationResponse(transformedUsers, query));
}

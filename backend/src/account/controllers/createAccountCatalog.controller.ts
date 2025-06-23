import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { resPayloadError } from '../../utils/respond.utils';
import { getAccountMemberList } from '../../userRole/userRole.db';
import { createCatalog } from '../../catalog/catalog.db';
import { UserRole } from '@prisma/client';

export async function createAccountCatalogController(
  req: AuthRequest,
  res: Response,
) {
  const payloadError = getPayloadError(req.body);
  if (payloadError) {
    return resPayloadError(res, payloadError);
  }

  const { accountId } = req.params;
  const memberList = await getAccountMemberList(accountId);
  const catalogRoles = [
    {
      user: { connect: { id: req.user.id } },
      role: UserRole.ADMIN,
    },
  ];

  memberList.forEach(({ userId, role }) => {
    if (
      userId !== req.user.id &&
      (role === UserRole.ADMIN || role === UserRole.EDITOR)
    ) {
      catalogRoles.push({
        user: { connect: { id: userId } },
        // @ts-ignore
        role,
      });
    }
  });

  const { name, description } = req.body;

  const catalog = await createCatalog({
    name,
    description,
    meta: {},
    account: { connect: { id: accountId } },
    users: {
      create: catalogRoles,
    },
  });

  return res.status(201).json({ id: catalog.id });
}

function getPayloadError({ name, description }: any) {
  if (!name) {
    return 'name_required';
  }
  if (typeof name !== 'string') {
    return 'invalid_name';
  }
  if (description && typeof description !== 'string') {
    return 'invalid_description';
  }
}

import { Response } from 'express';
import { AuthRequest } from 'src/auth/auth.types';
import { getPaginationResponse } from '../../utils/respond.utils';
import { getPaginationQuery } from '../../utils/request.utils';
import { getCatalogsByQuery } from '../../catalog/catalog.db';
import { UserRole } from '@prisma/client';

export async function getAccountCatalogListController(
  req: AuthRequest,
  res: Response,
) {
  const { accountId } = req.params;

  const { catalogs, query } =
    req.user.role === UserRole.COLLABORATOR
      ? await getCollaboratorCatalogs(req, accountId)
      : await getAccountCatalogs(req, accountId);

  return res.json(getPaginationResponse(catalogs, query));
}

async function getAccountCatalogs(req: AuthRequest, accountId: string) {
  const query = getPaginationQuery(req, { where: { accountId } });
  const catalogs = await getCatalogsByQuery(query);
  return { catalogs, query };
}

async function getCollaboratorCatalogs(req: AuthRequest, accountId: string) {
  const query = getPaginationQuery(req, {
    where: {
      accountId,
      users: { some: { userId: req.user.id } },
    },
  });
  const catalogs = await getCatalogsByQuery(query);
  return { catalogs, query };
}

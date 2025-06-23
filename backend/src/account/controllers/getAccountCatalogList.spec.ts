import { getCatalogsByQuery as db1 } from '../../catalog/catalog.db';
import {
  prepareTestAuthToken,
  mockRequestUserRole,
  mockAuthGet,
} from '../../../testing/testing.utils';
import { UserRole } from '@prisma/client';

jest.mock('../../catalog/catalog.db.ts');

describe('getCatalogList.controller', () => {
  const getCatalogsByQuery = db1 as jest.Mock;

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  beforeEach(() => {
    mockRequestUserRole(UserRole.ADMIN);
  });

  it('should return forbidden if not part of the account', async () => {
    mockRequestUserRole(UserRole.NONE);
    const res = await mockAuthGet('/v1/accounts/dummy_account_id/catalogs');
    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({ error: 'forbidden' });
  });

  describe('when the user is an editor of the account', () => {
    it('should return all the catalogs of the account', async () => {
      getCatalogsByQuery.mockResolvedValue([
        { id: 'dummy_catalog_id_1' },
        { id: 'dummy_catalog_id_2' },
      ]);
      mockRequestUserRole(UserRole.EDITOR);

      const res = await mockAuthGet(
        '/v1/accounts/dummy_account_id/catalogs?orderBy=id&cursor=dummy_cursor&orderDirection=desc',
      );
      expect(getCatalogsByQuery).toHaveBeenCalledWith({
        orderBy: { id: 'desc' },
        cursor: { id: 'dummy_cursor' },
        where: { accountId: 'dummy_account_id' },
        skip: 1,
        take: 100,
      });

      expect(res.body).toMatchObject({
        items: [{ id: 'dummy_catalog_id_1' }, { id: 'dummy_catalog_id_2' }],
        pageSize: 100,
        cursor: 'dummy_cursor',
        nextCursor: 'dummy_catalog_id_2',
      });
    });
  });

  describe('when the user is a collaborator of the account', () => {
    it('should return only the catalog where the user has permissions', async () => {
      getCatalogsByQuery.mockResolvedValue([
        { id: 'dummy_catalog_id_1' },
        { id: 'dummy_catalog_id_2' },
      ]);
      mockRequestUserRole(UserRole.COLLABORATOR);

      const res = await mockAuthGet(
        '/v1/accounts/dummy_account_id/catalogs?orderBy=id&cursor=dummy_cursor&orderDirection=desc',
      );
      expect(getCatalogsByQuery).toHaveBeenCalledWith({
        orderBy: { id: 'desc' },
        cursor: { id: 'dummy_cursor' },
        where: {
          accountId: 'dummy_account_id',
          users: {
            some: { userId: 'dummy_user_id' },
          },
        },
        skip: 1,
        take: 100,
      });

      expect(res.body).toMatchObject({
        items: [{ id: 'dummy_catalog_id_1' }, { id: 'dummy_catalog_id_2' }],
        pageSize: 100,
        cursor: 'dummy_cursor',
        nextCursor: 'dummy_catalog_id_2',
      });
    });
  });
});

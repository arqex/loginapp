import { createCatalog as db1 } from '../../catalog/catalog.db';
import { getAccountMemberList as db2 } from '../../userRole/userRole.db';
import {
  prepareTestAuthToken,
  mockRequestUserRole,
  mockAuthPost,
} from '../../../testing/testing.utils';
import { UserRole } from '@prisma/client';

jest.mock('../../catalog/catalog.db.ts');
jest.mock('../../userRole/userRole.db.ts');

describe('createAccountCatalog.controller', () => {
  const createCatalog = db1 as jest.Mock;
  const getAccountMemberList = db2 as jest.Mock;

  const payload = {
    name: 'dummy_name',
  };

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  beforeEach(() => {
    mockRequestUserRole(UserRole.EDITOR);
  });

  // Permisions
  it('should return forbidden for COLLABORATORs', async () => {
    mockRequestUserRole(UserRole.COLLABORATOR);
    const res = await mockAuthPost(
      '/v1/accounts/dummy_account_id/catalogs',
    ).send(payload);
    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({ error: 'forbidden' });
  });

  // Validations
  it('should return "name_required" when name is not provided', async () => {
    createCatalog.mockResolvedValue({ id: 'dummy_catalog_id' });
    const res = await mockAuthPost(
      '/v1/accounts/dummy_account_id/catalogs',
    ).send({});
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      error: 'invalid_payload',
      reason: 'name_required',
    });
    expect(createCatalog).not.toHaveBeenCalled();
  });

  // Success
  it('should create a catalog', async () => {
    createCatalog.mockResolvedValue({ id: 'dummy_catalog_id' });
    getAccountMemberList.mockResolvedValue([
      { userId: 'dummy_user_id', role: UserRole.EDITOR },
      { userId: 'dummy_user_admin', role: UserRole.ADMIN },
      { userId: 'dummy_user_editor', role: UserRole.EDITOR },
      { userId: 'dummy_user_collaborator', role: UserRole.COLLABORATOR },
    ]);
    const res = await mockAuthPost(
      '/v1/accounts/dummy_account_id/catalogs',
    ).send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 'dummy_catalog_id' });
    expect(createCatalog).toHaveBeenCalledWith({
      name: 'dummy_name',
      account: { connect: { id: 'dummy_account_id' } },
      description: undefined,
      meta: {},
      users: {
        create: [
          { user: { connect: { id: 'dummy_user_id' } }, role: UserRole.ADMIN },
          {
            user: { connect: { id: 'dummy_user_admin' } },
            role: UserRole.ADMIN,
          },
          {
            user: { connect: { id: 'dummy_user_editor' } },
            role: UserRole.EDITOR,
          },
        ],
      },
    });
  });
});

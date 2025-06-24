import { getUsersByQuery as db1 } from '../../users/users.db';
import {
  prepareTestAuthToken,
  mockRequestUsersOnAccountRole,
  mockAuthGet,
} from '../../../testing/testing.utils';
import { UsersOnAccountRole } from '@prisma/client';

jest.mock('../../users/users.db.ts');

describe('getUserList.controller', () => {
  const getUsersByQuery = db1 as jest.Mock;

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  beforeEach(() => {
    mockRequestUsersOnAccountRole(UsersOnAccountRole.ADMIN);
  });

  it('should return forbidden for editors', async () => {
    mockRequestUsersOnAccountRole(UsersOnAccountRole.EDITOR);
    const res = await mockAuthGet('/v1/accounts/dummy_account_id/users');
    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({ error: 'forbidden' });
  });

  it('should return paginated items', async () => {
    getUsersByQuery.mockResolvedValue([
      { id: 'dummy_user_id_1' },
      { id: 'dummy_user_id_2' },
    ]);

    const res = await mockAuthGet(
      '/v1/accounts/dummy_account_id/users?orderBy=id&cursor=dummy_cursor&orderDirection=desc',
    );
    expect(getUsersByQuery).toHaveBeenCalledWith({
      orderBy: { id: 'desc' },
      cursor: { id: 'dummy_cursor' },
      skip: 1,
      take: 100,
      where: {
        accounts: { some: { accountId: 'dummy_account_id' } },
      },
    });

    expect(res.body).toMatchObject({
      items: [{ id: 'dummy_user_id_1' }, { id: 'dummy_user_id_2' }],
      pageSize: 100,
      cursor: 'dummy_cursor',
      nextCursor: 'dummy_user_id_2',
    });
  });
});

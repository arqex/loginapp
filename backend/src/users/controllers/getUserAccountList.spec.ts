import { getAccountsByQuery as db1 } from '../../account/account.db';
import {
  prepareTestAuthToken,
  mockRequestUsersOnAccountRole,
  mockAuthGet,
} from '../../../testing/testing.utils';
import { UsersOnAccountRole } from '@prisma/client';

jest.mock('../../account/account.db.ts');

describe('getAccountList.controller', () => {
  const getAccountsByQuery = db1 as jest.Mock;

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  beforeEach(() => {
    mockRequestUsersOnAccountRole(UsersOnAccountRole.ADMIN);
  });

  it('should return forbidden if trying to access other user', async () => {
    const res = await mockAuthGet('/v1/users/other_user/accounts');
    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({ error: 'forbidden' });
  });

  it('should return paginated accounts of the user', async () => {
    getAccountsByQuery.mockResolvedValue([
      { id: 'dummy_account_id_1' },
      { id: 'dummy_account_id_2' },
    ]);

    const res = await mockAuthGet(
      '/v1/users/dummy_user_id/accounts?orderBy=id&cursor=dummy_cursor&orderDirection=desc',
    );

    expect(getAccountsByQuery).toHaveBeenCalledWith({
      orderBy: { id: 'desc' },
      cursor: { id: 'dummy_cursor' },
      where: { users: { some: { userId: 'dummy_user_id' } } },
      skip: 1,
      take: 100,
    });

    expect(res.body).toMatchObject({
      items: [{ id: 'dummy_account_id_1' }, { id: 'dummy_account_id_2' }],
      pageSize: 100,
      cursor: 'dummy_cursor',
      nextCursor: 'dummy_account_id_2',
    });
  });
});

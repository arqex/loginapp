import { getUserAccountsWithDetails as db1 } from '../../userRole/userRole.db';
import {
  prepareTestAuthToken,
  mockAuthGet,
} from '../../../testing/testing.utils';

jest.mock('../../userRole/userRole.db.ts');

describe('getUserAccounts.controller', () => {
  const getUserAccountsWithDetails = db1 as jest.Mock;

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  it('should return forbidden if trying to access other user', async () => {
    const res = await mockAuthGet('/v1/users/other_user/accounts/details');
    expect(res.status).toBe(403);
    expect(res.body).toMatchObject({ error: 'forbidden' });
  });

  it('should return user accounts with details, filtering out null accounts', async () => {
    getUserAccountsWithDetails.mockResolvedValue([
      { account: { id: 'acc1' }, role: 'ADMIN' },
      { account: null, role: 'COLLABORATOR' },
      { account: { id: 'acc2' }, role: 'EDITOR' },
    ]);

    const res = await mockAuthGet('/v1/users/dummy_user_id/accounts/details');

    expect(getUserAccountsWithDetails).toHaveBeenCalledWith('dummy_user_id');
    expect(res.body).toEqual([
      { account: { id: 'acc1' }, role: 'ADMIN' },
      { account: { id: 'acc2' }, role: 'EDITOR' },
    ]);
  });
});

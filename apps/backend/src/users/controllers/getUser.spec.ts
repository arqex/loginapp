import {
  mockAuthGet,
  prepareTestAuthToken,
} from '../../../testing/testing.utils';

import { getUserById as db1 } from '../users.db';
jest.mock('../users.db');

describe('getUser.controller', () => {
  const getUserById = db1 as jest.Mock;

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  it('should try to load the user', async () => {
    getUserById.mockResolvedValue(null);
    await mockAuthGet('/users/dummy_user_id');
    expect(getUserById).toHaveBeenCalledWith('dummy_user_id');
  });

  it('should return 404 if the user is not found', async () => {
    getUserById.mockResolvedValue(null);
    const response = await mockAuthGet('/users/dummy_user_id');
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: 'user_not_found',
    });
  });

  it('should return the user if it exists', async () => {
    getUserById.mockResolvedValue({
      id: 'dummy_user_id',
      email: 'dummy@email.com',
    });
    const response = await mockAuthGet('/users/dummy_user_id');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 'dummy_user_id',
      email: 'dummy@email.com',
    });
  });
});

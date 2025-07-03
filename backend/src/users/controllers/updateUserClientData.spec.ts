import { updateUser as db1, getUserById as db2 } from '../users.db';
import {
  prepareTestAuthToken,
  mockAuthPatch,
} from '../../../testing/testing.utils';

jest.mock('../users.db.ts');

describe('updateUserClientData.controller', () => {
  const updateUser = db1 as jest.Mock;
  const getUserById = db2 as jest.Mock;

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user clientData successfully', async () => {
    const updatedUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: { name: 'Test User' },
      clientData: { theme: 'dark', language: 'en' },
    };

    updateUser.mockResolvedValue(updatedUser);
    getUserById.mockResolvedValue(updatedUser);

    const response = await mockAuthPatch(
      '/users/dummy_user_id/client-data',
    ).send({
      clientData: { theme: 'dark', language: 'en' },
    });

    expect(updateUser).toHaveBeenCalledWith('dummy_user_id', {
      clientData: { theme: 'dark', language: 'en' },
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      name: 'Test User',
      clientData: { theme: 'dark', language: 'en' },
      signals: {},
    });
  });

  it('should handle null clientData', async () => {
    const updatedUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: { name: 'Test User' },
      clientData: null,
    };

    updateUser.mockResolvedValue(updatedUser);
    getUserById.mockResolvedValue(updatedUser);

    const response = await mockAuthPatch(
      '/users/dummy_user_id/client-data',
    ).send({
      clientData: null,
    });

    expect(updateUser).toHaveBeenCalledWith('dummy_user_id', {
      clientData: null,
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      name: 'Test User',
      clientData: {},
    });
  });

  it('should return 400 for invalid clientData type', async () => {
    const response = await mockAuthPatch(
      '/users/dummy_user_id/client-data',
    ).send({
      clientData: 'invalid_string',
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: 'invalid_client_data',
    });
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('should return 400 for array clientData', async () => {
    const response = await mockAuthPatch(
      '/users/dummy_user_id/client-data',
    ).send({
      clientData: ['invalid', 'array'],
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: 'invalid_client_data',
    });
    expect(updateUser).not.toHaveBeenCalled();
  });

  it('should return 404 if user not found after update', async () => {
    updateUser.mockResolvedValue({});
    getUserById.mockResolvedValue(null);

    const response = await mockAuthPatch(
      '/users/dummy_user_id/client-data',
    ).send({
      clientData: { theme: 'light' },
    });

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: 'user_not_found',
    });
  });
});

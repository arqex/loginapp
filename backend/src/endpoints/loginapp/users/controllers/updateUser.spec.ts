import { updateUser as db1, getUserById as db2 } from '../users.db';
import {
  prepareTestAuthToken,
  mockAuthPatch,
} from '../../../testing/testing.utils';

jest.mock('../users.db.ts');

describe('updateUser.controller', () => {
  const updateUser = db1 as jest.Mock;
  const getUserById = db2 as jest.Mock;

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user meta successfully', async () => {
    const currentUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: { existingField: 'existing value' },
      clientData: { theme: 'dark' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: {
        existingField: 'existing value',
        name: 'Updated User',
        bio: 'New bio',
      },
      clientData: { theme: 'dark' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    getUserById.mockResolvedValueOnce(currentUser); // First call to get current user
    updateUser.mockResolvedValue(updatedUser);
    getUserById.mockResolvedValueOnce(updatedUser); // Second call after update

    const response = await mockAuthPatch('/users/dummy_user_id').send({
      meta: { name: 'Updated User', bio: 'New bio' },
    });

    expect(updateUser).toHaveBeenCalledWith('dummy_user_id', {
      meta: {
        existingField: 'existing value',
        name: 'Updated User',
        bio: 'New bio',
      },
    });
    expect(getUserById).toHaveBeenCalledTimes(2);
    expect(response.status).toBe(200);
    expect(response.body.meta).toEqual({
      existingField: 'existing value',
      name: 'Updated User',
      bio: 'New bio',
    });
    expect(response.body.authenticatedId).toBe('dummy_user_id');
    expect(response.body.clientData).toBeUndefined(); // Should be excluded from response
  });

  it('should update individual meta fields', async () => {
    const currentUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: { existingField: 'existing value' },
      clientData: { theme: 'dark' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: {
        existingField: 'existing value',
        name: 'John Doe',
        bio: 'Software Developer',
      },
      clientData: { theme: 'dark' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    getUserById.mockResolvedValueOnce(currentUser);
    updateUser.mockResolvedValue(updatedUser);
    getUserById.mockResolvedValueOnce(updatedUser);

    const response = await mockAuthPatch('/users/dummy_user_id').send({
      name: 'John Doe',
      bio: 'Software Developer',
    });

    expect(updateUser).toHaveBeenCalledWith('dummy_user_id', {
      meta: {
        existingField: 'existing value',
        name: 'John Doe',
        bio: 'Software Developer',
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.meta.name).toBe('John Doe');
    expect(response.body.meta.bio).toBe('Software Developer');
  });

  it('should return 400 when no update data is provided', async () => {
    const response = await mockAuthPatch('/users/dummy_user_id').send({});

    expect(updateUser).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('no_update_data');
  });

  it('should return 400 when no valid update fields are provided', async () => {
    const response = await mockAuthPatch('/users/dummy_user_id').send({
      email: 'new@email.com', // Not allowed field
      id: 'new_id', // Not allowed field
      invalidField: 'value', // Not allowed field
    });

    expect(updateUser).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('no_valid_update_fields');
  });

  it('should return 400 when meta is not an object', async () => {
    const response = await mockAuthPatch('/users/dummy_user_id').send({
      meta: 'invalid_meta',
    });

    expect(updateUser).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('invalid_meta_data');
  });

  it('should return 400 when meta is an array', async () => {
    const response = await mockAuthPatch('/users/dummy_user_id').send({
      meta: ['invalid', 'array'],
    });

    expect(updateUser).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('invalid_meta_data');
  });

  it('should allow meta to be null', async () => {
    const currentUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: { name: 'John' },
      clientData: { theme: 'dark' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: null,
      clientData: { theme: 'dark' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    getUserById.mockResolvedValueOnce(currentUser);
    updateUser.mockResolvedValue(updatedUser);
    getUserById.mockResolvedValueOnce(updatedUser);

    const response = await mockAuthPatch('/users/dummy_user_id').send({
      meta: null,
    });

    expect(updateUser).toHaveBeenCalledWith('dummy_user_id', { meta: null });
    expect(response.status).toBe(200);
  });

  it('should return 404 when user is not found before update', async () => {
    getUserById.mockResolvedValue(null);

    const response = await mockAuthPatch('/users/dummy_user_id').send({
      name: 'Test',
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('user_not_found');
  });

  it('should return 404 when user is not found after update', async () => {
    updateUser.mockResolvedValue({});
    getUserById.mockResolvedValue(null);

    const response = await mockAuthPatch('/users/dummy_user_id').send({
      meta: { name: 'Test' },
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('user_not_found');
  });

  it('should return 500 when update fails', async () => {
    const currentUser = {
      id: 'dummy_user_id',
      email: 'dummy@email.com',
      meta: { name: 'John' },
      clientData: { theme: 'dark' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    getUserById.mockResolvedValueOnce(currentUser);
    updateUser.mockRejectedValue(new Error('Database error'));

    const response = await mockAuthPatch('/users/dummy_user_id').send({
      name: 'Test',
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('update_failed');
  });
});

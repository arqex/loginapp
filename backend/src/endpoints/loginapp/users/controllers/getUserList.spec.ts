import { getUsersByQuery as db1 } from '../users.db';
import {
  prepareTestAuthToken,
  mockAuthGet,
} from '../../../testing/testing.utils';

jest.mock('../users.db.ts');

describe('getUserList.controller', () => {
  const getUserByQuery = db1 as jest.Mock;

  beforeAll(async () => {
    await prepareTestAuthToken();
  });

  it('should return paginated items', async () => {
    getUserByQuery.mockResolvedValue([
      { id: 'dummy_user_id_1' },
      { id: 'dummy_user_id_2' },
    ]);

    const res = await mockAuthGet(
      '/users?orderBy=dummy_field&cursor=dummy_cursor&orderDirection=desc',
    );
    expect(getUserByQuery).toHaveBeenCalledWith({
      orderBy: { dummy_field: 'desc' },
      cursor: { dummy_field: 'dummy_cursor' },
      skip: 1,
      take: 100,
    });

    expect(res.body).toMatchObject({
      items: [{ id: 'dummy_user_id_1' }, { id: 'dummy_user_id_2' }],
      pageSize: 100,
      cursor: 'dummy_cursor',
    });
  });
});

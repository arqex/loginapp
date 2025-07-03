import { User } from '@prisma/client';
import { generateUserSignals } from './signals.utils';
import * as prismaclient from '../prismaclient';

// Mock the Prisma client
jest.mock('../prismaclient');

const mockPrismaClient = {
  authToken: {
    findFirst: jest.fn(),
  },
};

(prismaclient.getPrismaClient as jest.Mock).mockReturnValue(mockPrismaClient);

describe('signals.utils', () => {
  const mockUser: User = {
    id: 'user123',
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    meta: { name: 'Test User' },
    clientData: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateUserSignals', () => {
    it('should return missingAuth signal when user has no tokens', async () => {
      mockPrismaClient.authToken.findFirst.mockResolvedValue(null);

      const signals = await generateUserSignals(mockUser);

      expect(signals.missingAuth).toBe(true);
      expect(mockPrismaClient.authToken.findFirst).toHaveBeenCalledWith({
        where: {
          userId: 'user123',
        },
      });
    });

    it('should not return missingAuth signal when user has tokens', async () => {
      const mockToken = {
        key: 'token123',
        userId: 'user123',
        type: 'API_KEY',
        createdAt: new Date(),
        expiresAt: null,
        meta: {},
      };

      mockPrismaClient.authToken.findFirst.mockResolvedValue(mockToken);

      const signals = await generateUserSignals(mockUser);

      expect(signals.missingAuth).toBeUndefined();
      expect(mockPrismaClient.authToken.findFirst).toHaveBeenCalledWith({
        where: {
          userId: 'user123',
        },
      });
    });

    it('should return empty signals object when user has auth tokens', async () => {
      const mockToken = {
        key: 'token456',
        userId: 'user123',
        type: 'EMAIL_LOGIN',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 86400000), // 24 hours from now
        meta: {},
      };

      mockPrismaClient.authToken.findFirst.mockResolvedValue(mockToken);

      const signals = await generateUserSignals(mockUser);

      expect(Object.keys(signals)).toHaveLength(0);
    });
  });
});

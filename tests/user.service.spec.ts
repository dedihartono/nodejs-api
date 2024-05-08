import { UserService } from '../src/api/v1/services';
import { UserRepository } from '../src/api/v1/interfaces/respositories';

// Mock UserRepository
import { jest, test } from '@jest/globals';
import { User } from '../src/sequelize/models';

// Mock UserRepository
const mockUserRepository: UserRepository = {
  getAllUsers: jest.fn<() => Promise<User[]>>(),
  createUser: jest.fn<() => Promise<User>>(),
  getUserById: jest.fn<() => Promise<User | null>>(),
  updateUser: jest.fn<() => Promise<number>>(),
  deleteUser: jest.fn<() => Promise<number>>(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return all empty array', async () => {
    return await userService.getAllUsers();
  });
});

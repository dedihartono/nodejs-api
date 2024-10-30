import { jest, test } from '@jest/globals';
import { User } from '../src/sequelize/models';
import { UserRepository } from '../src/api/v1/interfaces/respositories'; // Import UserRepository if not already imported
import { UserService } from '../src/api/v1/services'; // Import UserService if not already imported

// Mock UserRepository
const mockUserRepository: UserRepository = {
  getAllUsers: jest.fn<() => Promise<User[]>>(
    () => Promise.resolve([]) as unknown as Promise<User[]>, // explicitly cast the resolved value
  ),
  createUser: jest.fn<() => Promise<User>>(() => Promise.resolve({} as User)),
  getUserById: jest.fn<() => Promise<User | null>>(() => Promise.resolve(null)),
  updateUser: jest.fn<() => Promise<number>>(() => Promise.resolve(1)),
  deleteUser: jest.fn<() => Promise<number>>(() => Promise.resolve(1)),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return an empty array when getAllUsers is called', async () => {
    // Act
    const result = await userService.getAllUsers();

    // Assert
    expect(result).toEqual([]); // Verify that the result is an empty array
    expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1); // Verify that getAllUsers method of UserRepository is called once
  });

  test('should return users data when getAllUsers is called', async () => {
    // Arrange
    const mockUsers: User[] = [
      { id: 1, name: 'User 1', email: 'user1@example.com' } as unknown as User,
      { id: 2, name: 'User 2', email: 'user2@example.com' } as unknown as User,
    ];

    // Correctly define the mock function to return a Promise
    (mockUserRepository.getAllUsers as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockUsers),
    );

    // Act
    const result = await userService.getAllUsers();

    // Assert
    expect(result).toEqual(mockUsers); // Verify that the result matches the mockUsers data
    expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1); // Verify that getAllUsers method of UserRepository is called once
  });

  test('should create a user and return the created user data', async () => {
    // Arrange
    const userData: Partial<User> = {
      name: 'New User',
      email: 'newuser@example.com',
    };
    const createdUser: User = { id: 3, ...userData } as User; // Mock created user response

    // Mock the createUser method to return the created user
    (mockUserRepository.createUser as jest.Mock).mockImplementation(() =>
      Promise.resolve(createdUser),
    );

    // Act
    const result = await userService.createUser(userData);

    // Assert
    expect(result).toEqual(createdUser); // Verify that the result matches the created user data
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(userData); // Verify that createUser method of UserRepository is called with the correct data
    expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1); // Verify that createUser method of UserRepository is called once
  });

  test('should return a user when getUserById is called with a valid id', async () => {
    // Arrange
    const mockUser: User = {
      id: 1,
      name: 'User 1',
      email: 'user1@example.com',
    } as User;

    // Mock the getUserById method to return the mock user
    (mockUserRepository.getUserById as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockUser),
    );

    // Act
    const result = await userService.getUserById(1);

    // Assert
    expect(result).toEqual(mockUser); // Verify that the result matches the mock user
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(1); // Verify that getUserById method of UserRepository is called with the correct id
    expect(mockUserRepository.getUserById).toHaveBeenCalledTimes(1); // Verify that getUserById method of UserRepository is called once
  });

  test('should return null when getUserById is called with an invalid id', async () => {
    // Arrange
    (mockUserRepository.getUserById as jest.Mock).mockImplementation(() =>
      Promise.resolve(null),
    );

    // Act
    const result = await userService.getUserById(999); // Assuming 999 is an invalid id

    // Assert
    expect(result).toBeNull(); // Verify that the result is null
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(999); // Verify that getUserById method of UserRepository is called with the correct id
    expect(mockUserRepository.getUserById).toHaveBeenCalledTimes(1); // Verify that getUserById method of UserRepository is called once
  });

  test('should update a user and return the number of affected rows', async () => {
    // Arrange
    const userId = 1;
    const newData: Partial<User> = {
      name: 'Updated User',
      email: 'updateduser@example.com',
    };
    const affectedRows = 1; // Mock the number of affected rows

    // Mock the updateUser method to return the number of affected rows
    (mockUserRepository.updateUser as jest.Mock).mockImplementation(() =>
      Promise.resolve(affectedRows),
    );

    // Act
    const result = await userService.updateUser(userId, newData);

    // Assert
    expect(result).toBe(affectedRows); // Verify that the result matches the number of affected rows
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(userId, newData); // Verify that updateUser method of UserRepository is called with the correct parameters
    expect(mockUserRepository.updateUser).toHaveBeenCalledTimes(1); // Verify that updateUser method of UserRepository is called once
  });

  test('should delete a user and return the number of affected rows', async () => {
    // Arrange
    const userId = 1;
    const affectedRows = 1; // Mock the number of affected rows

    // Mock the deleteUser method to return the number of affected rows
    (mockUserRepository.deleteUser as jest.Mock).mockImplementation(() =>
      Promise.resolve(affectedRows),
    );

    // Act
    const result = await userService.deleteUser(userId);

    // Assert
    expect(result).toBe(affectedRows); // Verify that the result matches the number of affected rows
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId); // Verify that deleteUser method of UserRepository is called with the correct id
    expect(mockUserRepository.deleteUser).toHaveBeenCalledTimes(1); // Verify that deleteUser method of UserRepository is called once
  });

  test('should throw an error when createUser fails', async () => {
    // Arrange
    const userData: Partial<User> = {
      name: 'New User',
      email: 'newuser@example.com',
    };
    const errorMessage = 'Failed to create user';
    (mockUserRepository.createUser as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error(errorMessage)),
    );

    // Act & Assert
    await expect(userService.createUser(userData)).rejects.toThrow(
      errorMessage,
    ); // Verify that the error is thrown
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(userData); // Verify that createUser method of UserRepository is called with the correct data
  });

  test('should throw an error when getUserById fails', async () => {
    // Arrange
    const userId = 1;
    const errorMessage = 'Failed to get user';
    (mockUserRepository.getUserById as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error(errorMessage)),
    );

    // Act & Assert
    await expect(userService.getUserById(userId)).rejects.toThrow(errorMessage); // Verify that the error is thrown
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId); // Verify that getUserById method of UserRepository is called with the correct id
  });

  test('should throw an error when updateUser fails', async () => {
    // Arrange
    const userId = 1;
    const newData: Partial<User> = { name: 'Updated User' };
    const errorMessage = 'Failed to update user';
    (mockUserRepository.updateUser as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error(errorMessage)),
    );

    // Act & Assert
    await expect(userService.updateUser(userId, newData)).rejects.toThrow(
      errorMessage,
    ); // Verify that the error is thrown
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(userId, newData); // Verify that updateUser method of UserRepository is called with the correct parameters
  });

  test('should throw an error when deleteUser fails', async () => {
    // Arrange
    const userId = 1;
    const errorMessage = 'Failed to delete user';
    (mockUserRepository.deleteUser as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error(errorMessage)),
    );

    // Act & Assert
    await expect(userService.deleteUser(userId)).rejects.toThrow(errorMessage); // Verify that the error is thrown
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId); // Verify that deleteUser method of UserRepository is called with the correct id
  });
});

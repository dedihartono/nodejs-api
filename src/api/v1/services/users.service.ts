import { UserRepository } from '../interfaces/respositories';
import { User } from '../../../sequelize/models';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return await this.userRepository.createUser(userData);
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.getUserById(id);
  }

  async updateUser(id: number, newData: Partial<User>): Promise<number> {
    return await this.userRepository.updateUser(id, newData);
  }

  async deleteUser(id: number): Promise<number> {
    return await this.userRepository.deleteUser(id);
  }
}

export default UserService;

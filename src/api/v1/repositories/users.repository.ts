import { User } from '../../../sequelize/models';
import { UserRepository } from '../interfaces/respositories';

export class SequelizeUserRepository implements UserRepository {
  async getAllUsers(): Promise<User[]> {
    return await User.findAll({});
  }

  async createUser(userData: Partial<User>): Promise<User> {
    return await User.create(userData);
  }

  async getUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async updateUser(id: number, newData: Partial<User>): Promise<number> {
    const [affectedCount] = await User.update(newData, { where: { id } });
    return affectedCount;
  }

  async deleteUser(id: number): Promise<number> {
    return await User.destroy({ where: { id } });
  }
}

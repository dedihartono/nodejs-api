import { User } from '../../../sequelize/models';
import { UserRepository } from '../interfaces/respositories';

export class SequelizeUserRepository implements UserRepository {
  async getAllUsers(): Promise<User[]> {
    return await User.findAll({
      attributes: {
        exclude: [
          'password',
          'remember_token',
          'created_by',
          'updated_by',
          'deleted_by',
        ],
      },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'name', 'email'],
        },
        {
          model: User,
          as: 'modifier',
          attributes: ['id', 'username', 'name', 'email'],
        },
        {
          model: User,
          as: 'remover',
          attributes: ['id', 'username', 'name', 'email'],
        },
      ],
    });
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

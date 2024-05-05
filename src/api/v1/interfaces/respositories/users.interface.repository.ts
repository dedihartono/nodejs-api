import { User } from '../../../../sequelize/models';

export interface UserRepository {
  getAllUsers(): Promise<User[]>;
  createUser(userData: Partial<User>): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  updateUser(id: number, newData: Partial<User>): Promise<number>;
  deleteUser(id: number): Promise<number>;
}

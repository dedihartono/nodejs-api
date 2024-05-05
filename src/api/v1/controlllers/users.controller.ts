import { Request, Response } from 'express';
import UserService from '../services/users.service';
import User from '../interfaces/types/users.type';
import { __ } from '../constants';
import { SequelizeUserRepository } from '../repositories/users.repository';

const userRepository = new SequelizeUserRepository();
const userService = new UserService(userRepository);

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: __('failed.server') });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id);
    try {
      const user = await userService.getUserById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: __('failed.not_found') });
      }
    } catch (error) {
      res.status(500).json({ message: __('failed.server') });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const newUser: User = req.body;
    try {
      const createdUser = await userService.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ message: __('failed.server') });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id);
    const updatedUser: User = req.body;
    updatedUser.id = userId;
    try {
      const user = await userService.updateUser(userId, updatedUser);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: __('failed.not_found') });
      }
    } catch (error) {
      res.status(500).json({ message: __('failed.server') });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.id);
    try {
      const deletedUser = await userService.deleteUser(userId);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ message: __('failed.not_found') });
      }
    } catch (error) {
      res.status(500).json({ message: __('failed.server') });
    }
  }
}

export default UserController;

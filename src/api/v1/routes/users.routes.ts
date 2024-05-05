import { Router } from 'express';
import { UserController } from '../controlllers';
import { UserValidation } from '../validations';

const router = Router();

const userController = new UserController();

// GET /api/v1/users
router.get('/', userController.getAllUsers);

// GET /api/v1/users/:id
router.get('/:id', userController.getUserById);

// POST /api/v1/users
router.post('/', UserValidation.createUser, userController.createUser);

// PUT /api/v1/users/:id
router.put('/:id', UserValidation.updateUser, userController.updateUser);

// DELETE /api/v1/users/:id
router.delete('/:id', userController.deleteUser);

export default router;

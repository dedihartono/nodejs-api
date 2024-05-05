import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

class UserValidation {
  static createUser(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  }

  static updateUser(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  }
}

export default UserValidation;

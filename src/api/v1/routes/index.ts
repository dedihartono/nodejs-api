import { Router } from 'express';
import authRouter from './auth.routes';
import usersRouter from './users.routes';

const router = Router();
const VERSION = 'api/v1';

router.use(`/${VERSION}/auth`, authRouter);
router.use(`/${VERSION}/users`, usersRouter);

export default router;

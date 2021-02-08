import { Router } from 'express';
import userRouter from './User';

const router = Router();
router.use('/', userRouter);

export default router;

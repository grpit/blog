import { Router } from 'express';
import userRouter from './User';
import postRouter from './Post';

const router = Router();
router.use('/post', postRouter);
router.use('/', userRouter);

export default router;

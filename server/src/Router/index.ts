import { Router } from 'express';
import userRouter from './User';
import postRouter from './Post';
import draftRouter from './Draft';

const router = Router();
router.use('/post', postRouter);
router.use('/draft', draftRouter);
router.use('/', userRouter);

export default router;

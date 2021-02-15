import { Router } from 'express';

import userRouter from './User';
import postRouter from './Post';
import draftRouter from './Draft';

import { authRequired } from '../Middlewares/Auth';

const router = Router();
router.use('/post', postRouter);
router.use('/draft', authRequired, draftRouter);
router.use('/', userRouter);

export default router;

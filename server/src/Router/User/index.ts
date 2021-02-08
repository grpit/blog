import { Container } from 'typedi';
import { Router } from 'express';
import UserController from '../../Controllers/User';

const userRouter = Router();

userRouter.post('/login', (req, res) => {
  const userController = Container.get(UserController);
  return userController.login(req, res);
});
userRouter.post('/register', (req, res) => {
  const userController = Container.get(UserController);
  return userController.register(req, res);
});

export default userRouter;

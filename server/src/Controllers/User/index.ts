import { Request, Response } from 'express';
import UserService from '../../Services/User';
import { Inject, Service } from 'typedi';
import { setAuthCookie } from '../../Middlewares/Auth';

@Service()
export default class UserController {
  @Inject()
  private service: UserService;

  public login = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const result = await this.service.login({ username, password, email });
    if (result instanceof Error) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid Credentials Provided.' });
    }
    return setAuthCookie(result, res).json({
      message: 'Authentication Successful',
      success: true,
      data: null
    });
  };

  public register = async (req: Request, res: Response) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: `Passwords don't match` });
    }

    const result = await this.service.register({ username, email, password });
    return res.json(result);
  };
}

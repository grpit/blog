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
    // Todo: Add validations.
    const result = await this.service.login({ username, password, email });

    if (result instanceof Error) {
      return res.status(401).json({ success: false, message: result.message });
    }

    return setAuthCookie(result, res).json({
      success: true
    });
  };

  public register = async (req: Request, res: Response) => {
    const { username, email, password, confirmPassword } = req.body;
    // Todo: Add validations.
    if (password !== confirmPassword) {
      return res.status(400).json({ error: `Passwords don't match.` });
    }

    const result = await this.service.register({ username, email, password });

    if (result instanceof Error) {
      return res.status(400).json({ success: false, message: result.message });
    }

    return res.json({
      id: result.id,
      username: result.username,
      email: result.email
    });
  };
}

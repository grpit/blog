import { User } from '../../Models/User';
import UserRepository from '../../Repository/User';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';

type UserLoginParams = {
  email?: string;
  username?: string;
  password: string;
};

type UserRegisterParams = {
  username: string;
  email: string;
  password: string;
};

@Service()
export default class UserService {
  @InjectRepository(UserRepository)
  private readonly userRepository: UserRepository;

  public login = async ({
    username,
    email,
    password
  }: UserLoginParams): Promise<User | Error> => {
    // Todo: Add validations.
    const user = await this.userRepository.getForLogin(username, email);

    if (!user || !user.verify(password))
      throw Error('Invalid Username or Password.');
    return user;
  };

  public register = async ({
    username,
    email,
    password
  }: UserRegisterParams): Promise<User | Error> => {
    // Todo: Add validations.
    const user = new User(username, email, password);
    const userData = await this.userRepository.save(user);
    if (!userData)
      return Error(`Could not log you in check in after some time.`);
    return userData;
  };
}

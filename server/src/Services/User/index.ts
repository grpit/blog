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
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }]
    });

    if (!user) throw Error('Something Went Wrong');
    if (!user.verify(password)) throw Error('Something Went Wrong');

    return user;
  };

  public register = async ({
    username,
    email,
    password
  }: UserRegisterParams): Promise<User> => {
    const user = new User(username, email, password);
    const userData = await this.userRepository.save(user);
    return userData;
  };
}

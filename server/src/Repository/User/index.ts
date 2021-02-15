import { User } from '../../Models/User';
import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';

@Service()
@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public getForLogin = (username: string, email: string) => {
    return this.findOne({
      where: [{ username }, { email }],
      select: ['username', 'email', 'id']
    });
  };

  public getById = (id: number) => {
    return this.findOne({
      where: [{ id }],
      select: ['username', 'email', 'id']
    });
  };
}

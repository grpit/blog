import { User } from '../../Models/User';
import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';

@Service()
@EntityRepository(User)
export default class UserRepository extends Repository<User> {}

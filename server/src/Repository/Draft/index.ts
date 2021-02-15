import { EntityRepository, Repository } from 'typeorm';
import { Draft } from '../../Models/Draft';
import { User } from '../../../types';

@EntityRepository(Draft)
export default class DraftRepository extends Repository<Draft> {
  getAll() {
    return this.find();
  }

  getByHash(hash: string) {
    return this.findOne({ hash });
  }

  getByUser(user: User) {
    return this.find({ author: user?.id });
  }
}

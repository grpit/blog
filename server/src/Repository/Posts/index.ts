import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../../Models/Post';

@EntityRepository(Post)
export default class PostRepository extends Repository<Post> {
  getAll() {
    return this.find();
  }

  getById(id: number) {
    return this.findOne({ id });
  }

  // getByUserSlug(username: string, slug: string) {
  //   this.createQueryBuilder("post")
  //   .where("post.slug = :slug", {slug})
  //   .leftJoinAndSelect('auther','a')
  // }
}

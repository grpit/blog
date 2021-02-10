import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import PostRepository from '../../Repository/Posts';
import { Post } from '../../Models/Post';
import { ObjectLiteral } from 'typeorm';

@Service()
export default class PostService {
  @InjectRepository(PostRepository)
  private readonly postRepository: PostRepository;

  public getPost = async (id: number): Promise<Post | Error> => {
    const post = await this.postRepository.getById(id);
    if (!post) {
      return Error(`Post with specified id:${id} not found.`);
    }
    return post;
  };

  public updatePost = async (
    id: number,
    postData: any
  ): Promise<any | Error> => {
    const { affected } = await this.postRepository.update(id, postData);
    if (!affected) {
      return Error(`Could not update post with specified id:${id}.`);
    }
    return { updated: !!affected };
  };

  public createPost = async (postData: any): Promise<ObjectLiteral | Error> => {
    let post = await this.postRepository.create(postData);
    post = await this.postRepository.save(post);
    if (!post) {
      return Error(`Could not create Post, invalid data provided.`);
    }
    return post;
  };

  public deletePost = async (id: number): Promise<ObjectLiteral | Error> => {
    const post = await this.postRepository.delete(id);
    if (!post) {
      return Error(`Post with specified id:${id} not found.`);
    }
    return post;
  };

  public getAllPosts = async (): Promise<Post[] | Error> => {
    const post = await this.postRepository.getAll();
    if (!post) {
      return Error(`There are no posts to show.`);
    }
    return post;
  };
}

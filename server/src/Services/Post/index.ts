import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import PostRepository from '../../Repository/Posts';
import { Post } from '../../Models/Post';
import { ObjectLiteral } from 'typeorm';
import { User } from '../../../types';

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
    postData: any,
    user: User
  ): Promise<any | Error> => {
    const currentPost = await this.postRepository.getById(id);

    if (currentPost.id !== user?.id) {
      return Error(`You are not authorised to perform this action.`);
    }

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

  public deletePost = async (
    id: number,
    user: User
  ): Promise<ObjectLiteral | Error> => {
    const currentPost = await this.postRepository.getById(id);

    if (currentPost.id !== user?.id) {
      return Error(`You are not authorised to perform this action.`);
    }

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

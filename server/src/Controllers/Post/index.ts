import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import PostService from '../../Services/Post';

@Service()
export default class PostController {
  @Inject()
  private readonly postService: PostService;

  public get = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const response = await this.postService.getPost(id);
    res.json(response);
  };

  public put = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const postData = req.body;
    const user = req.user;
    const response = await this.postService.updatePost(id, postData, user);
    res.json(response);
  };

  public delete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = req.user;
    const response = await this.postService.deletePost(id, user);
    res.json(response);
  };

  public list = async (req: Request, res: Response) => {
    const response = await this.postService.getAllPosts();
    res.json(response);
  };
}

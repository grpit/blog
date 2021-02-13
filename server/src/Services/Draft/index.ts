import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ObjectLiteral } from 'typeorm';
import { User } from '../../../types';

import PostService from '../Post';
import DraftRepository from '../../Repository/Draft';
import { Draft } from '../../Models/Draft';

interface ICreateDraft {
  hash: string;
  // author: number
}

@Service()
export default class DraftService {
  @InjectRepository(DraftRepository)
  private readonly draftRepository: DraftRepository;

  @Inject()
  private readonly postService: PostService;

  public getDraft = async (hash: string): Promise<Draft | Error> => {
    const draft = await this.draftRepository.getByHash(hash);
    if (!draft) {
      return Error(`Draft with specified hash:${hash} not found.`);
    }
    return draft;
  };

  public updateDraft = async (
    hash: string,
    draftData: any
  ): Promise<any | Error> => {
    // Todo: get user and check if same as author.
    const { affected } = await this.draftRepository.update(hash, draftData);
    if (!affected) {
      return Error(`Could not update draft with specified hash:${hash}.`);
    }
    return { updated: !!affected };
  };

  public createDraft = async (
    draftData: ICreateDraft
  ): Promise<ObjectLiteral | Error> => {
    // Todo: get user in ICreateDraft.
    let draft = await this.draftRepository.create(draftData);
    draft = await this.draftRepository.save(draft);
    if (!draft) {
      return Error(`Could not create Draft, invalid data provided.`);
    }
    return draft;
  };

  public publishDraft = async (
    hash: string
  ): Promise<ObjectLiteral | Error> => {
    const draft = await this.draftRepository.getByHash(hash);

    // Todo: Add auth to check if creator is same as publisher/currentUser.
    if (!draft) return Error(`No draft to publish`);

    const { title, description, content, author } = draft;

    const postData = {
      title,
      description,
      content,
      author
    };
    const post = await this.postService.createPost(postData);

    return post;
  };

  public getMyDraft = async (user: User): Promise<Draft[] | Error> => {
    const drafts = await this.draftRepository.getByUser(user);
    return drafts;
  };
}

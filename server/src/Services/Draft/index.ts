import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ObjectLiteral } from 'typeorm';
import { User } from '../../../types';

import PostService from '../Post';
import DraftRepository from '../../Repository/Draft';
import { Draft } from '../../Models/Draft';
import UserRepository from '../../Repository/User';

interface ICreateDraft {
  hash: string;
  author: number;
}

interface IUpdateDraft {
  title?: string;
  description?: string;
  content?: object;
}

@Service()
export default class DraftService {
  @InjectRepository(DraftRepository)
  private readonly draftRepository: DraftRepository;

  @InjectRepository(UserRepository)
  private readonly userRepository: UserRepository;

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
    draftData: IUpdateDraft,
    user: User
  ): Promise<any | Error> => {
    const existingUser = await this.userRepository.getById(user?.id);
    const existingDraft = await this.draftRepository.getByHash(hash);

    if (!existingUser) {
      return Error(`Invalid User passed in the cookie.`);
    }
    if (!existingDraft) {
      return Error(`Draft with the given ID does not exist.`);
    }
    if (existingUser.id !== existingDraft.author) {
      return Error(`You are not authorised to make this request.`);
    }

    const { affected } = await this.draftRepository.update(hash, draftData);
    if (!affected) {
      return Error(`Could not update draft with specified hash:${hash}.`);
    }

    return { updated: !!affected };
  };

  public createDraft = async (
    draftData: ICreateDraft
  ): Promise<ObjectLiteral | Error> => {
    let draft = this.draftRepository.create(draftData);
    draft = await this.draftRepository.save(draft);
    if (!draft) {
      return Error(`Could not create Draft, invalid data provided.`);
    }
    return draft;
  };

  public publishDraft = async (
    hash: string,
    user: User
  ): Promise<ObjectLiteral | Error> => {
    const draft = await this.draftRepository.getByHash(hash);
    const existingUser = await this.userRepository.getById(user?.id);

    if (!existingUser) {
      return Error(`Invalid User passed in the cookie.`);
    }
    if (!draft) {
      return Error(`Draft with the given ID does not exist.`);
    }
    if (existingUser.id !== draft.author) {
      return Error(`You are not authorised to make this request.`);
    }

    const { title, description, content, author } = draft;
    const postData = {
      title,
      description,
      content,
      author
    };
    const post = await this.postService.createPost(postData);
    // Todo: Set draft as published.
    // Todo: Publish only if not published already.
    return post;
  };

  public getMyDraft = async (user: User): Promise<Draft[] | Error> => {
    // Todo: remove published drafts from list.
    const drafts = await this.draftRepository.getByUser(user);
    return drafts;
  };
}

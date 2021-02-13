import { Response, Request } from 'express';
import { Inject, Service } from 'typedi';
import DraftService from '../../Services/Draft';

@Service()
export default class PostController {
  @Inject()
  private readonly draftService: DraftService;

  public get = async (req: Request, res: Response) => {
    const hash: string = req.params.hash;
    const response = await this.draftService.getDraft(hash);
    res.json(response);
  };

  public put = async (req: Request, res: Response) => {
    // Todo: add user to update service.
    const hash = req.params.hash;
    const draftData = req.body;

    const response = await this.draftService.updateDraft(hash, draftData);
    res.json(response);
  };

  public post = async (req: Request, res: Response) => {
    // Todo: add user to create service.
    const hash = req.query.hash as string;
    const response = await this.draftService.createDraft({ hash });
    res.json(response);
  };

  public publish = async (req: Request, res: Response) => {
    // Todo: add user to publish service.
    const hash = req.query.hash as string;
    const response = await this.draftService.publishDraft(hash);
    res.json(response);
  };

  public listMine = async (req: Request, res: Response) => {
    const response = await this.draftService.getMyDraft(req.user);
    res.json(response);
  };
}

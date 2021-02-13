import { Container } from 'typedi';
import { Router } from 'express';
import DraftController from '../../Controllers/Draft';

const router = Router();

router.get('/:hash', (req, res) => {
  const draftController = Container.get(DraftController);
  return draftController.get(req, res);
});

router.post('/', (req, res) => {
  const draftController = Container.get(DraftController);
  return draftController.post(req, res);
});

router.put('/:hash', (req, res) => {
  const draftController = Container.get(DraftController);
  return draftController.put(req, res);
});

router.post('/publish/:hash', (req, res) => {
  const draftController = Container.get(DraftController);
  return draftController.publish(req, res);
});

router.get('/mine', (req, res) => {
  const draftController = Container.get(DraftController);
  return draftController.listMine(req, res);
});

export default router;

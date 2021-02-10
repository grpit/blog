import { Container } from 'typedi';
import { Router } from 'express';
import PostController from '../../Controllers/Post';

const router = Router();

router.get('/:id', (req, res) => {
  const postController = Container.get(PostController);
  return postController.get(req, res);
});

router.post('/', (req, res) => {
  const postController = Container.get(PostController);
  return postController.post(req, res);
});

router.delete('/:id', (req, res) => {
  const postController = Container.get(PostController);
  return postController.delete(req, res);
});

router.put('/:id', (req, res) => {
  const postController = Container.get(PostController);
  return postController.put(req, res);
});

router.get('/', (req, res) => {
  const postController = Container.get(PostController);
  return postController.list(req, res);
});

export default router;

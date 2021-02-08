import express, { Request, Response } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import router from './src/Router';

const app = express();

const shouldCompress = (req: Request, res: Response) => {
  // should not compress if header is set.
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

// Express Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(compression({ filter: shouldCompress }));

app.use('/api', router);

export default app;

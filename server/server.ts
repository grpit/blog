import express, { Request, Response } from 'express';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import router from './src/Router';
import { getUserFromCookie } from './src/Middlewares/Auth';

const app = express();

const shouldCompress = (req: Request, res: Response) => {
  // should not compress if header is set.
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

// Express Base Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(compression({ filter: shouldCompress }));

// Express custom Middleware
app.use(getUserFromCookie);

app.use('/api', router);

export default app;

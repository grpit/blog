import express, { Request, Response } from 'express';
import compression from 'compression';
import morgan from 'morgan';

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

// Express Routes config
app.get('/api/', (req: Request, res: Response) => {
  res.send('hello');
});

export default app;

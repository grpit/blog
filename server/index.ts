import 'reflect-metadata';
// import path from 'path';
// import fs from 'fs';
import compression from 'compression';

import next from 'next';
// import spdy, { ServerOptions } from 'spdy';
import express, { Request, Response } from 'express';
// import { createConnection } from 'typeorm';
import morgan from 'morgan';

const port = parseInt(process.env.PORT ?? '3000', 10);
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
// const handle = app.getRequestHandler();

const shouldCompress = (req: Request, res: Response) => {
  // should not compress if header is set.
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

// const options = {
//   key: fs.readFileSync(path.join(__dirname, '/privateKey.key')),
//   cert: fs.readFileSync(path.join(__dirname, '/certificate.crt'))
// };

app.prepare().then(() => {
  const expressApp = express();

  // Express Middlewares
  expressApp.use(express.json());
  expressApp.use(morgan('dev'));
  expressApp.use(compression({ filter: shouldCompress }));

  // Express Routes config
  expressApp.get('/api/', (req: Request, res: Response) => {
    res.send('hello');
  });

  // fallback all request to next request handler
  expressApp.all('*', (req, res) => {
    // @ts-ignore-next-line
    return app.render(req, res, req.path, req.query);
  });

  expressApp.listen(port, () => {
    // eslint-ignore-next-line
    console.log('running');
  });

  // createConnection().then(() => {
  //   spdy.createServer(options, expressApp).listen(port, () => {
  //     console.log(`HTTP/2 server listening on port: ${port}`);
  //   });
  // });
});

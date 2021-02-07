import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import next from 'next';
import spdy, { ServerOptions } from 'spdy';

import server from './server';
import database from './database';

const PORT = parseInt(process.env.PORT ?? '3000', 10);
const DEV = process.env.NODE_ENV !== 'production';

const app = next({ dev: DEV });

const options: ServerOptions = {
  key: fs.readFileSync(path.join(__dirname, '/localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, '/localhost.crt'))
};

app.prepare().then(() => {
  // fallback all request to next request handler
  server.all('*', (req, res) => {
    // @ts-ignore-next-line
    return app.render(req, res, req.path, req.query);
  });

  database.connect().then(() => {
    spdy.createServer(options, server).listen(PORT, () => {
      // eslint-disable-next-line
      console.log(`HTTP/2 server listening on port: ${PORT}`);
    });
  });
});

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

(async () => {
  await app.prepare();
  await database.connect();

  // @ts-ignore
  server.all('*', (req, res) => {
    return app.render(req, res, req.path);
  });

  spdy.createServer(options, server).listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`HTTP/2 server listening on port: ${PORT}`);
  });
})();

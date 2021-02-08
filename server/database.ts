import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

useContainer(Container);

export default {
  connect: createConnection
};

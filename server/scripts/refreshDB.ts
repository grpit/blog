import { createConnection } from 'typeorm';

(async () => {
  try {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.runMigrations();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
})();

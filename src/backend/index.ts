import { run } from './run';
import { sequelize } from './db';

run();

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

process.on('SIGINT', async () => {
  console.warn('Caught interrupt signal');
  await sequelize.close();
  process.exit(2);
});

import 'dotenv/config';

export default {
  client: process.env.DB_CLIENT || 'sqlite3',
  connection: {
    filename: process.env.DB_FILENAME || './dev.sqlite3'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations'
  }
};

import knex from 'knex';
import knexfile from '../../knexfile.js';

export const db = knex(knexfile);

class DB {
  static async addLead(data) {
    return db('leads').insert(data);
  }
}

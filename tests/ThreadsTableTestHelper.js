/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-001',
    user_id = 'user-123',
    title = 'title',
    body = 'body',
    username = 'bruce',
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP ,$5) RETURNING id, title, username',
      // eslint-disable-next-line camelcase
      values: [id, user_id, title, body, username],
    };

    await pool.query(query);
  },

  async getThread() {
    const query = {
      text: 'SELECT * FROM threads',
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;

/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const RepliesTableTestHelper = {
  async addReply({
    userId = 'user-123',
    content = 'content 123',
    threadId = '',
    commentId = '',
    username = 'bruce',
    id = 'reply-123',
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6) RETURNING id, content, username;',
      values: [id, userId, commentId, threadId, username, content],
    };

    await pool.query(query);
  },

  async getReplies() {
    const query = {
      text: 'SELECT * FROM replies',
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findReplyById(id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

module.exports = RepliesTableTestHelper;

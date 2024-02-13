const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedReplyComment = require('../../Domains/replies/entities/AddedReplyComment');
const Replies = require('../../Domains/replies/entities/Replies');
const ReplyRepository = require('../../Domains/replies/ReplyRepository');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async repliesByThreadId(threadId) {
    const query = {
      text: 'SELECT id, username, date, content, comment_id, is_deleted FROM replies WHERE thread_id = $1;',
      values: [threadId],
    };
    const result = await this._pool.query(query);
    return new Replies({ replies: result.rows });
  }

  async replyComment(payload) {
    const {
      username, commentId, content, threadId,
    } = payload;
    const userId = payload.id;
    const id = `reply-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO replies VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, $6) RETURNING id, content, username;',
      values: [id, userId, commentId, threadId, username, content],
    };

    const result = await this._pool.query(query);

    return new AddedReplyComment(result.rows[0]);
  }

  async deleteReplyComment(payload) {
    const { threadId, replyId, id } = payload;

    const query = {
      text: 'UPDATE replies SET is_deleted = $1 WHERE id = $2 AND thread_id = $3 AND user_id = $4;',
      values: [true, replyId, threadId, id],
    };

    await this._pool.query(query);

    return true;
  }

  async checkReplyIdAvailability(replyId) {
    const query = {
      text: 'SELECT user_id FROM replies WHERE id = $1',
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('balasan id tidak valid');
    }

    return true;
  }
  // eslint-disable-next-line camelcase

  async checkReplyOwner({ replyId, id }) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (result.rows[0].user_id !== id) {
      throw new AuthorizationError('anda bukan pemilik komentar');
    }

    return true;
  }
}

module.exports = ReplyRepositoryPostgres;

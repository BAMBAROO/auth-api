const AddedThreadComment = require('../../Domains/comments/entities/AddedThreadComment');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const Comments = require('../../Domains/comments/entities/Comments');
const CommentRepository = require('../../Domains/comments/CommentRepository');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThreadComment(payload) {
    const { username, content, threadId } = payload;
    // eslint-disable-next-line camelcase
    const user_id = payload.id;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP ,$5) RETURNING id, content, user_id, is_deleted;',
      // eslint-disable-next-line camelcase
      values: [id, user_id, threadId, username, content],
    };

    const result = await this._pool.query(query);

    return new AddedThreadComment({ ...result.rows[0] });
  }

  /** is_deleted = true * */
  async deleteThreadComment(payload) {
    const { threadId, commentId, id } = payload;
    const query = {
      text: 'UPDATE comments SET is_deleted = $1 WHERE id = $2 AND thread_id = $3 AND user_id = $4;',
      values: [true, commentId, threadId, id],
    };

    await this._pool.query(query);

    return true;
  }

  async commentsByThreadId(threadId) {
    const query = {
      text: 'SELECT id, username, date, content, is_deleted FROM comments WHERE thread_id = $1;',
      values: [threadId],
    };
    const result = await this._pool.query(query);
    return new Comments({ comments: result.rows });
  }

  async checkCommentIdAvailability(commentId) {
    const query = {
      text: 'SELECT user_id FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('komentar id tidak valid');
    }

    return true;
  }

  // eslint-disable-next-line camelcase
  async checkCommentsOwner({ commentId, id }) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (result.rows[0].user_id !== id) {
      throw new AuthorizationError('anda bukan pemilik komentar');
    }

    return true;
  }
}

module.exports = CommentRepositoryPostgres;

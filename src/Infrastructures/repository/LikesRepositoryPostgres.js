const LikeRepository = require('../../Domains/likes/LikeRepository');

class LikesRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addLikeComment({ id, commentId }) {
    const like_id = `like-${this._idGenerator()}`;
    const query = {
      text: 'INSERT INTO likes VALUES($1, $2, $3)',
      values: [like_id, id, commentId],
    };
    await this._pool.query(query);

    return true;
  }

  async deleteLikeComment({ id, commentId }) {
    const query = {
      text: 'DELETE FROM likes WHERE user_id = $1 AND comment_id = $2',
      values: [id, commentId],
    };

    await this._pool.query(query);

    return true;
  }

  async checkLiked({ id, commentId }) {
    const query = {
      text: 'SELECT * FROM likes WHERE user_id = $1 AND comment_id = $2',
      values: [id, commentId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      return false;
    }

    return true;
  }

  async likesByCommentId(commentId) {
    const query = {
      text: 'SELECT * FROM likes WHERE comment_id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    return result.rowCount;
  }
}

module.exports = LikesRepositoryPostgres;

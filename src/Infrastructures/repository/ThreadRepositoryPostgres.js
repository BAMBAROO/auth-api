const ThreadRepository = require('../../Domains/threads/ThreadRepository');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const Threads = require('../../Domains/threads/entities/Threads');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(payload) {
    const { body, title, username } = payload;
    // eslint-disable-next-line camelcase
    const user_id = payload.id;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP ,$5) RETURNING id, title, user_id;',
      // eslint-disable-next-line camelcase
      values: [id, user_id, title, body, username],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async threadById(threadId) {
    const query = {
      text: 'SELECT id, title, body, date, username FROM threads WHERE id = $1;',
      values: [threadId],
    };
    const result = await this._pool.query(query);

    return new Threads(result.rows[0]);
  }

  async checkThreadIdAvailability(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('thread id tidak valid');
    }

    return true;
  }
}

module.exports = ThreadRepositoryPostgres;

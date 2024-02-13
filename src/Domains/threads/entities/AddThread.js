const InvariantError = require('../../../Commons/exceptions/InvariantError');

class AddThread {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.username = payload.username;
    this.title = payload.title;
    this.body = payload.body;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload(payload) {
    const {
      title, body, id, username,
    } = payload;

    if (!title || !body || !id || !username) {
      throw new InvariantError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string' || typeof id !== 'string' || typeof username !== 'string') {
      throw new InvariantError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThread;

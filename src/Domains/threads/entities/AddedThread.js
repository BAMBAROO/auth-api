const InvariantError = require('../../../Commons/exceptions/InvariantError');

class AddedThread {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.title = payload.title;
    this.owner = payload?.user_id;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ id, user_id, title }) {
    if (!id || !user_id || !title) {
      throw new InvariantError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof user_id !== 'string' || typeof title !== 'string') {
      throw new InvariantError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedThread;

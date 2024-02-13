const InvariantError = require('../../../Commons/exceptions/InvariantError');

class Threads {
  constructor(payload) {
    this._verifyPayload(payload);

    this.thread = payload;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload(thread) {
    if (!thread) {
      throw new InvariantError('NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof thread !== typeof []) {
      throw new InvariantError(
        'NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    }
  }
}

module.exports = Threads;

const InvariantError = require('../../../Commons/exceptions/InvariantError');

class Replies {
  constructor(payload) {
    this._verifyPayload(payload);

    this.replies = payload.replies;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ replies }) {
    if (typeof replies === 'string' || typeof replies === 'number') {
      throw new InvariantError(
        'NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    }
  }
}

module.exports = Replies;

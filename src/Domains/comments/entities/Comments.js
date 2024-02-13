const InvariantError = require('../../../Commons/exceptions/InvariantError');

class Comments {
  constructor(payload) {
    this._verifyPayload(payload);

    this.comments = payload.comments;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ comments }) {
    if (typeof comments === 'number' || typeof comments === 'string') {
      throw new InvariantError(
        'NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    }
  }
}

module.exports = Comments;

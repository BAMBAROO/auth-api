const InvariantError = require('../../../Commons/exceptions/InvariantError');

class AddedThreadComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.content = payload.content;
    this.owner = payload?.user_id;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ id, user_id, content }) {
    if (!id || !user_id || !content) {
      throw new InvariantError('ADDED_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof user_id !== 'string' || typeof content !== 'string') {
      throw new InvariantError('ADDED_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedThreadComment;

const InvariantError = require('../../../Commons/exceptions/InvariantError');

class AddedReplyComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.content = payload.content;
    this.owner = payload?.username;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({
    id, username, content,
  }) {
    if (!id || !username || !content) {
      throw new InvariantError('REPLY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof content !== 'string') {
      throw new InvariantError('REPLY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedReplyComment;

const InvariantError = require('../../../Commons/exceptions/InvariantError');

class AddThreadComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.content = payload.content;
    this.threadId = payload.threadId;
    this.id = payload.id;
    this.username = payload.username;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload(payload) {
    const {
      content, id, threadId, username,
    } = payload;

    if (!content || !id || !threadId || !username) {
      throw new InvariantError('ADD_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof id !== 'string' || typeof username !== 'string' || typeof threadId !== 'string') {
      throw new InvariantError('ADD_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThreadComment;

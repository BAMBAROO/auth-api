const InvariantError = require('../../../Commons/exceptions/InvariantError');

class AddReply {
  constructor(payload) {
    this._verifyPayload(payload);

    this.threadId = payload.threadId;
    this.commentId = payload.commentId;
    this.content = payload.content;
    this.id = payload.id;
    this.username = payload.username;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({
    threadId, commentId, id, content, username,
  }) {
    if (!commentId || !threadId || !id || !content || !username) {
      throw new InvariantError('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof commentId !== 'string' || typeof threadId !== 'string' || typeof id !== 'string' || typeof content !== 'string' || typeof username !== 'string') {
      throw new InvariantError('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddReply;

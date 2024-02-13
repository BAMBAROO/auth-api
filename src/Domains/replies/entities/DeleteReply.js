class DeleteReply {
  constructor(payload) {
    this._verifyPayload(payload);

    this.threadId = payload.threadId;
    this.commentId = payload.commentId;
    this.replyId = payload.replyId;
    this.id = payload.id;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({
    threadId, commentId, id, replyId,
  }) {
    if (!commentId || !threadId || !id || !replyId) {
      throw new Error('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      (typeof commentId !== 'string'
        || typeof threadId !== 'string'
        || typeof id !== 'string'
        || typeof replyId !== 'string')
    ) {
      throw new Error('DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteReply;

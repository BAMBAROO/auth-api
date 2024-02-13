class DeleteThreadComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.threadId = payload.threadId;
    this.commentId = payload.commentId;
    this.id = payload.id;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ threadId, commentId, id }) {
    if (!commentId || !threadId || !id) {
      throw new Error('DELETE_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof commentId !== 'string' || typeof threadId !== 'string' || typeof id !== 'string') {
      throw new Error('DELETE_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteThreadComment;

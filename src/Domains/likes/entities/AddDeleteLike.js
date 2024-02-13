const InvariantError = require('../../../Commons/exceptions/InvariantError');

class AddDeleteLike {
  constructor(useCasePayload) {
    this._verifyPayload(useCasePayload);

    this.id = useCasePayload.id;
    this.commentId = useCasePayload.commentId;
    this.threadId = useCasePayload.threadId;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ id, commentId, threadId }) {
    if (!id || !commentId || !threadId) {
      throw new InvariantError('NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof commentId !== 'string' || typeof threadId !== 'string') {
      throw new InvariantError('NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddDeleteLike;

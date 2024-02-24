const InvariantError = require('../../../Commons/exceptions/InvariantError');

class DetailThreadComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.date = payload.date;
    this.content = payload.is_deleted
      ? '**komentar telah dihapus**'
      : payload.content;
    this.username = payload?.username;
    this.likeCount = payload.likeCount;
    this.replies = [];
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({
    id, username, content, date, is_deleted, likeCount,
  }) {
    if (!id || !username || !content || !date || likeCount === undefined || likeCount === null) {
      throw new InvariantError('DETAIL_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof username !== 'string'
      || typeof content !== 'string'
      || typeof is_deleted !== 'boolean'
      || typeof likeCount !== 'number'
    ) {
      throw new InvariantError(
        'DETAIL_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    }
  }
}

module.exports = DetailThreadComment;

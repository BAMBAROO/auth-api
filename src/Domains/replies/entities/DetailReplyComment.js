const InvariantError = require('../../../Commons/exceptions/InvariantError');

class DetailReplyComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.date = payload.date;
    this.content = payload.is_deleted
      ? '**balasan telah dihapus**'
      : payload.content;
    this.username = payload?.username;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({
    id, username, content, date, is_deleted,
  }) {
    if (!id || !username || !content || !date) {
      throw new InvariantError('DETAIL_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof username !== 'string'
      || typeof content !== 'string'
      || typeof is_deleted !== 'boolean'
    ) {
      throw new InvariantError(
        'DETAIL_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION',
      );
    }
  }
}

module.exports = DetailReplyComment;

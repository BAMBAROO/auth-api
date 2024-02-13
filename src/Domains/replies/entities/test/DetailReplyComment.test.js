const DetailReplyComment = require('../DetailReplyComment');

describe('a DeleteThreadComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'reply-001',
      username: 'bryan athallah',
      content: 'content',
      is_deleted: true,
    };
    expect(() => new DetailReplyComment(payload)).toThrowError(
      'DETAIL_REPLY.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'reply-001',
      username: 'bryan athallah',
      content: 'content',
      date: '01-01-2004',
      is_deleted: 'true',
    };
    expect(() => new DetailReplyComment(payload)).toThrowError(
      'DETAIL_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create addReply object correctly with is_deleted true', () => {
    const payload = {
      id: 'reply-001',
      username: 'bryan athallah',
      content: 'content',
      date: '01-01-2004',
      is_deleted: true,
    };
    const detailReplyComment = new DetailReplyComment(payload);

    expect(detailReplyComment.id).toEqual(payload.id);
    expect(detailReplyComment.username).toEqual(payload.username);
    expect(detailReplyComment.date).toEqual(payload.date);
    expect(detailReplyComment.content).toEqual('**balasan telah dihapus**');
  });

  it('should create addReply object correctly with is_deleted false', () => {
    const payload = {
      id: 'reply-001',
      username: 'bryan athallah',
      content: 'content',
      date: '01-01-2004',
      is_deleted: false,
    };
    const detailReplyComment = new DetailReplyComment(payload);

    expect(detailReplyComment.id).toEqual(payload.id);
    expect(detailReplyComment.username).toEqual(payload.username);
    expect(detailReplyComment.date).toEqual(payload.date);
    expect(detailReplyComment.content).toEqual(payload.content);
  });
});

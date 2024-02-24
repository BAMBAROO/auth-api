const DetailThreadComment = require('../DetailThreadComment');

describe('a DeleteThreadComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'reply-001',
      username: 'bryan athallah',
      content: 'content',
      is_deleted: true,
      date: '',
    };
    expect(() => new DetailThreadComment(payload)).toThrowError(
      'DETAIL_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'reply-001',
      username: 'bryan athallah',
      content: 'content',
      date: '01-01-2004',
      likeCount: '123',
      is_deleted: true,
    };
    expect(() => new DetailThreadComment(payload)).toThrowError(
      'DETAIL_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create addReply object correctly', () => {
    const payload = {
      id: 'reply-001',
      username: 'bryan athallah',
      content: 'content',
      date: '01-01-2004',
      likeCount: 123,
      is_deleted: true,
    };
    const detailThreadComment = new DetailThreadComment(payload);

    expect(detailThreadComment.id).toEqual(payload.id);
    expect(detailThreadComment.username).toEqual(payload.username);
    expect(detailThreadComment.date).toEqual(payload.date);
    expect(detailThreadComment.content).toEqual('**komentar telah dihapus**');
    expect(detailThreadComment.replies).toEqual([]);
  });

  it('should create addReply object correctly', () => {
    const payload = {
      id: 'reply-001',
      username: 'bryan athallah',
      content: 'content',
      date: '01-01-2004',
      likeCount: 123,
      is_deleted: false,
    };
    const detailThreadComment = new DetailThreadComment(payload);

    expect(detailThreadComment.id).toEqual(payload.id);
    expect(detailThreadComment.username).toEqual(payload.username);
    expect(detailThreadComment.date).toEqual(payload.date);
    expect(detailThreadComment.content).toEqual(payload.content);
    expect(detailThreadComment.replies).toEqual([]);
  });
});

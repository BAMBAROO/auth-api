const DeleteThreadComment = require('../DeleteThreadComment');

describe('a DeleteThreadComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      commentId: 'comment-001',
      id: 'secret',
    };
    expect(() => new DeleteThreadComment(payload)).toThrowError('DELETE_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      commentId: 234,
      threadId: 'thread-001',
      id: 'secret',
    };
    expect(() => new DeleteThreadComment(payload)).toThrowError('DELETE_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = {
      commentId: 'comment-001',
      threadId: 'thread-001',
      id: 'secret',
    };

    const addThread = new DeleteThreadComment(payload);

    expect(addThread.threadId).toEqual(payload.threadId);
    expect(addThread.commentId).toEqual(payload.commentId);
    expect(addThread.id).toEqual(payload.id);
  });
});

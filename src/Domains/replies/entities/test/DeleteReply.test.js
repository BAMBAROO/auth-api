const DeleteReply = require('../DeleteReply');

describe('a DeleteThreadComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      threadId: 'thread-001',
      commentId: 'comment-001',
      id: 'secret',
    };
    expect(() => new DeleteReply(payload)).toThrowError('DELETE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      commentId: 234,
      threadId: 'thread-001',
      replyId: 'reply-001',
      id: 'secret',
    };
    expect(() => new DeleteReply(payload)).toThrowError('DELETE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = {
      commentId: 'comment-001',
      threadId: 'thread-001',
      replyId: 'reply-001',
      id: 'secret',
    };

    const addThread = new DeleteReply(payload);

    expect(addThread.threadId).toEqual(payload.threadId);
    expect(addThread.commentId).toEqual(payload.commentId);
    expect(addThread.id).toEqual(payload.id);
    expect(addThread.replyId).toEqual(payload.replyId);
  });
});

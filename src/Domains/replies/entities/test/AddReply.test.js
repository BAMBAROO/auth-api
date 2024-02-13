const AddReply = require('../AddReply');

describe('a AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      threadId: 'thread-001',
      commentId: 'comment-001',
      id: 'secret',
      username: 'bryan',
    };
    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      threadId: 'thread-001',
      commentId: 'comment-001',
      username: 'bryan',
      content: 123,
      id: 'reply-123',
    };
    expect(() => new AddReply(payload)).toThrowError('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = {
      threadId: 'thread-001',
      commentId: 'comment-001',
      username: 'bryan',
      content: 'This is Content',
      id: 'reply-123',
    };

    const addReply = new AddReply(payload);

    expect(addReply.threadId).toEqual(payload.threadId);
    expect(addReply.commentId).toEqual(payload.commentId);
    expect(addReply.content).toEqual(payload.content);
    expect(addReply.id).toEqual(payload.id);
    expect(addReply.username).toEqual(payload.username);
  });
});

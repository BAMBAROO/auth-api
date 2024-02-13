const AddThreadComment = require('../AddThreadComment');

describe('a AddThreadComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      content: 'content',
      threadId: 'secret',
      id: 'user-123',
    };
    expect(() => new AddThreadComment(payload)).toThrowError('ADD_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      content: 'content',
      threadId: 123,
      id: 'user-123',
      username: 'Bruce Wayne',
    };
    expect(() => new AddThreadComment(payload)).toThrowError('ADD_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = {
      content: 'content',
      threadId: 'thread-123',
      id: 'user-123',
      username: 'Bruce Wayne',
    };

    const addThread = new AddThreadComment(payload);

    expect(addThread.threadId).toEqual(payload.threadId);
    expect(addThread.content).toEqual(payload.content);
    expect(addThread.id).toEqual(payload.id);
    expect(addThread.username).toEqual(payload.username);
  });
});

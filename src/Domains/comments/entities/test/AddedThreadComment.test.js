const AddedThreadComment = require('../AddedThreadComment');

describe('a AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = { id: 'comment-001', user_id: 'user-002' };
    expect(() => new AddedThreadComment(payload)).toThrowError('ADDED_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = { id: 'comment-001', user_id: 'user-002', content: 123 };
    expect(() => new AddedThreadComment(payload)).toThrowError('ADDED_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = { id: 'comment-001', user_id: 'user-002', content: 'content' };

    const addedThread = new AddedThreadComment(payload);

    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.owner).toEqual(payload.user_id);
    expect(addedThread.content).toEqual(payload.content);
  });
});

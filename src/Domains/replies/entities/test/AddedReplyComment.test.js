const AddedReplyComment = require('../AddedReplyComment');

describe('a AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      username: 'bryan athallah',
      content: 'this is content',
    };
    expect(() => new AddedReplyComment(payload)).toThrowError('REPLY_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'user-001',
      username: 'bryan athallah',
      content: 123,
    };
    expect(() => new AddedReplyComment(payload)).toThrowError('REPLY_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedReplyComment object correctly', () => {
    const payload = {
      id: 'user-001',
      username: 'bryan athallah',
      content: 'this is content',
    };

    const addedReplyComment = new AddedReplyComment(payload);

    expect(addedReplyComment.id).toEqual(payload.id);
    expect(addedReplyComment.owner).toEqual(payload.username);
    expect(addedReplyComment.content).toEqual(payload.content);
  });
});

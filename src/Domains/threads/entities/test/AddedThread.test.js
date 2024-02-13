const AddedThread = require('../AddedThread');

describe('a AddReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = { id: 'thread-001', user_id: 'bryan athallah' };
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = { id: 'thread-001', user_id: 'bryan athallah', title: 123 };
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = { id: 'thread-001', user_id: 'bryan athallah', title: 'Title' };

    const addedThread = new AddedThread(payload);

    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.owner).toEqual(payload.user_id);
    expect(addedThread.title).toEqual(payload.title);
  });
});

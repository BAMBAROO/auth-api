const AddThread = require('../AddThread');

describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'title',
      id: 'user-123',
      username: 'Bruce Wayne',
    };
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'user-123',
      username: 'Bruce Wayne',
      title: 'title',
      body: 123,
    };
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addReply object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'Bruce Wayne',
      title: 'title',
      body: 'body',
    };

    const addThread = new AddThread(payload);

    expect(addThread.title).toEqual(payload.title);
    expect(addThread.body).toEqual(payload.body);
    expect(addThread.id).toEqual(payload.id);
    expect(addThread.username).toEqual(payload.username);
  });
});

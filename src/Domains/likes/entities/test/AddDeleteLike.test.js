const AddDeleteLike = require('../AddDeleteLike');
const InvariantError = require('../../../../Commons/exceptions/InvariantError');

describe('operating the possibility scenario', () => {
  it('should throw error', () => {
    const payload = {
      id: 'something',
      commentId: 'something',
    };
    expect(() => new AddDeleteLike(payload)).toThrowError('NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddDeleteLike(payload)).toThrowError(InvariantError);
  });

  it('should throw error', () => {
    const payload = {
      id: 'something',
      commentId: 123,
      threadId: 'something',
    };
    expect(() => new AddDeleteLike(payload)).toThrowError('NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddDeleteLike(payload)).toThrowError(InvariantError);
  });

  it('should not to throw error (success)', () => {
    const payload = {
      id: 'something',
      commentId: 'something',
      threadId: 'something',
    };
    expect(() => new AddDeleteLike(payload)).not.toThrowError('NOT_MEET_DATA_TYPE_SPECIFICATION');
    expect(() => new AddDeleteLike(payload)).not.toThrowError('NOT_CONTAIN_NEEDED_PROPERTY');
    expect(() => new AddDeleteLike(payload)).not.toThrowError(InvariantError);
  });
});

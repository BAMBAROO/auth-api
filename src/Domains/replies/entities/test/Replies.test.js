const InvariantError = require('../../../../Commons/exceptions/InvariantError');
// const ThreadCommentsReplies = require('../ThreadCommentsReplies');
const Replies = require('../Replies');

describe('ThreadCommentsReplies Entities', () => {
  describe('testing all posibility for Threads', () => {
    it('should throw error when payload did not contain data type specification', () => {
      expect(() => new Replies({})).not
        .toThrowError(
          'NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
      expect(() => new Replies({})).not
        .toThrowError(InvariantError);
    });

    it('should not to throw error when payload are valid', () => {
      expect(() => new Replies({ replies: 'halo' }))
        .toThrowError(
          'NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
      expect(() => new Replies({ replies: 'halo' }))
        .toThrowError(InvariantError);
    });

    it('should not to throw error when payload are valid', () => {
      expect(() => new Replies({ replies: 22 }))
        .toThrowError(
          'NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
      expect(() => new Replies({ replies: 22 }))
        .toThrowError(InvariantError);
    });
  });
});

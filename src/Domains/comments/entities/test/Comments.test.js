const InvariantError = require('../../../../Commons/exceptions/InvariantError');
// const ThreadCommentsReplies = require('../ThreadCommentsReplies');
const Comments = require('../Comments');

describe('ThreadCommentsReplies Entities', () => {
  describe('testing all posibility for Threads', () => {
    it('should throw error when payload did not contain data type specification', () => {
      expect(() => new Comments([])).not
        .toThrowError(
          'NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
      expect(() => new Comments([])).not
        .toThrowError(InvariantError);
    });

    it('should not to throw error when payload are valid', () => {
      expect(() => new Comments({ comments: 'halo' }))
        .toThrowError(
          'NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
      expect(() => new Comments({ comments: 'halo' }))
        .toThrowError(InvariantError);
    });

    it('should not to throw error when payload are valid', () => {
      expect(() => new Comments({ comments: 22 }))
        .toThrowError(
          'NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
      expect(() => new Comments({ comments: 22 }))
        .toThrowError(InvariantError);
    });
  });
});

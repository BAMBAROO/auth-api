const InvariantError = require('../../../../Commons/exceptions/InvariantError');
const Threads = require('../Threads');

describe('Threads Entities', () => {
  describe('testing all posibility for Threads', () => {
    it('should throw error when payload did not contain needed data', () => {
      expect(() => new Threads())
        .toThrowError(
          'NOT_CONTAIN_NEEDED_PROPERTY',
        );
      expect(() => new Threads())
        .toThrowError(InvariantError);
    });

    it('should throw error when payload did not contain data type specification', () => {
      const payload = {};
      expect(() => new Threads(payload)).not
        .toThrowError(
          'NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
      expect(() => new Threads(payload)).not
        .toThrowError(InvariantError);
    });

    it('should not to throw error when payload are valid', () => {
      const payload = 'halo';
      expect(() => new Threads(payload))
        .toThrowError(
          'NOT_MEET_DATA_TYPE_SPECIFICATION',
        );
      expect(() => new Threads(payload))
        .toThrowError(InvariantError);
    });
  });
});

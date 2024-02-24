const { some, some2 } = require('./some');

describe('some', () => {
  it('some', () => {
    expect(some()).toBe(true);
  });
  it('some2', () => {
    expect(some2()).not.toBe(true);
  });
});

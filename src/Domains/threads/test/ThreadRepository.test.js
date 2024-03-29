const ThreadRepository = require('../ThreadRepository');

describe('UserRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const threadRepository = new ThreadRepository();

    // Action and Assert
    await expect(threadRepository.addThread({}))
      .rejects
      .toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.threadById(''))
      .rejects
      .toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.checkThreadIdAvailability(''))
      .rejects
      .toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});

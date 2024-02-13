const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'Justice League',
      body: 'Batman v Superman',
      id: 'user-001',
      username: 'Bruce Wayne',
    };

    const mockAddedThread = new AddedThread({
      id: 'thread-001',
      title: useCasePayload.title,
      user_id: useCasePayload.id,
    });

    const mockThreadRepository = new ThreadRepositoryPostgres();

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));

    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'thread-001',
      title: 'Justice League',
      user_id: 'user-001',
    }));
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});

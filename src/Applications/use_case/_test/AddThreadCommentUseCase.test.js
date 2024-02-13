const CommentRepositoryPostgres = require('../../../Infrastructures/repository/CommentRepositoryPostgres');
const AddThreadCommentUseCase = require('../AddThreadCommentUseCase');
const AddedThreadComment = require('../../../Domains/comments/entities/AddedThreadComment');
const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');

describe('AddThreadCommentUseCase', () => {
  it('should orchestrating the add thread comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'lorem ipsum dolor sit amet',
      username: 'Bruce Wayne',
      id: 'user-001',
      threadId: 'thread-001',
    };

    const mockAddedThreadComment = new AddedThreadComment({
      id: 'comment-001',
      content: useCasePayload.content,
      user_id: useCasePayload.id,
    });

    const mockCommentRepository = new CommentRepositoryPostgres();
    const mockThreadRepository = new ThreadRepositoryPostgres();

    mockCommentRepository.addThreadComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThreadComment));
    mockThreadRepository.checkThreadIdAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve(true));

    const addThreadCommentUseCase = new AddThreadCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThreadComment = await addThreadCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedThreadComment).toStrictEqual(new AddedThreadComment({
      id: 'comment-001',
      content: 'lorem ipsum dolor sit amet',
      user_id: 'user-001',
    }));
    expect(mockThreadRepository.checkThreadIdAvailability(useCasePayload.threadId));
    expect(mockCommentRepository.addThreadComment).toBeCalledWith(useCasePayload);
  });
});

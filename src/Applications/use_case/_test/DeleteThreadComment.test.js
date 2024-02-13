const CommentRepositoryPostgres = require('../../../Infrastructures/repository/CommentRepositoryPostgres');
const DeleteThreadCommentUseCase = require('../DeleteThreadCommentUseCase');
const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');

describe('DeleteThreadCommentUseCase', () => {
  it('should orchestrating the delete thread comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      commentId: 'comment-001',
      threadId: 'thread-001',
      id: 'user-001',
    };

    const mockCommentRepository = new CommentRepositoryPostgres();
    const mockThreadRepository = new ThreadRepositoryPostgres();

    mockThreadRepository.checkThreadIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.checkCommentIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.checkCommentsOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.deleteThreadComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    const deleteThreadCommentUseCase = new DeleteThreadCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await deleteThreadCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.checkThreadIdAvailability).toBeCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.checkCommentIdAvailability).toBeCalledWith(
      useCasePayload.commentId,
    );
    expect(mockCommentRepository.checkCommentsOwner).toBeCalledWith(
      { commentId: useCasePayload.commentId, id: useCasePayload.id },
    );
    expect(mockCommentRepository.deleteThreadComment).toBeCalledWith(
      {
        threadId: useCasePayload.threadId,
        commentId: useCasePayload.commentId,
        id: useCasePayload.id,
      },
    );
  });
});

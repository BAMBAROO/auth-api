const DeleteReplyUseCase = require('../DeleteReplyUseCase');
const ReplyRepositoryPostgres = require('../../../Infrastructures/repository/ReplyRepositoryPostgres');
const CommentRepositoryPostgres = require('../../../Infrastructures/repository/CommentRepositoryPostgres');
const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');

describe('DeleteReplyUseCase', () => {
  it('should orchestrating the delete reply comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      commentId: 'comment-001',
      threadId: 'thread-001',
      replyId: 'reply-001',
      id: 'user-002',
    };

    const mockReplyRepository = new ReplyRepositoryPostgres();
    const mockCommentRepository = new CommentRepositoryPostgres();
    const mockThreadRepository = new ThreadRepositoryPostgres();

    mockThreadRepository.checkThreadIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.checkCommentIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockReplyRepository.checkReplyIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockReplyRepository.checkReplyOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockReplyRepository.deleteReplyComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    const deleteReplyUseCase = new DeleteReplyUseCase({
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    await deleteReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.checkThreadIdAvailability).toBeCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.checkCommentIdAvailability).toBeCalledWith(
      useCasePayload.commentId,
    );
    expect(mockReplyRepository.checkReplyIdAvailability).toBeCalledWith(
      useCasePayload.replyId,
    );
    expect(mockReplyRepository.checkReplyOwner).toBeCalledWith(
      { replyId: useCasePayload.replyId, id: useCasePayload.id },
    );
    expect(mockReplyRepository.deleteReplyComment).toBeCalledWith(
      { threadId: useCasePayload.threadId, replyId: useCasePayload.replyId, id: useCasePayload.id },
    );
  });
});

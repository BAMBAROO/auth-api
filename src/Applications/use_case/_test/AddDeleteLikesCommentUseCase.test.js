const CommentRepositoryPostgres = require('../../../Infrastructures/repository/CommentRepositoryPostgres');
const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');
const AddDeleteLikesCommentUseCase = require('../AddDeleteLikesCommentUseCase');
const LikesRepositoryPostgres = require('../../../Infrastructures/repository/LikesRepositoryPostgres');

describe('DeleteThreadCommentUseCase', () => {
  it('should orchestrating the add like comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      commentId: 'comment-001',
      threadId: 'thread-001',
      id: 'user-001',
    };

    const mockCommentRepository = new CommentRepositoryPostgres();
    const mockThreadRepository = new ThreadRepositoryPostgres();
    const mockLikeRepository = new LikesRepositoryPostgres();

    mockThreadRepository.checkThreadIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.checkCommentIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockLikeRepository.checkLiked = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockLikeRepository.addLikeComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    const addDeleteLikesCommentUseCase = new AddDeleteLikesCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    await addDeleteLikesCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.checkThreadIdAvailability).toBeCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.checkCommentIdAvailability).toBeCalledWith(
      useCasePayload.commentId,
    );
    expect(mockLikeRepository.checkLiked).toBeCalledWith({
      id: useCasePayload.id, commentId: useCasePayload.commentId,
    });
    expect(mockLikeRepository.addLikeComment).toBeCalledWith({
      id: useCasePayload.id, commentId: useCasePayload.commentId,
    });
  });

  it('should orchestrating the delete like comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      commentId: 'comment-001',
      threadId: 'thread-001',
      id: 'user-001',
    };

    const mockCommentRepository = new CommentRepositoryPostgres();
    const mockThreadRepository = new ThreadRepositoryPostgres();
    const mockLikeRepository = new LikesRepositoryPostgres();

    mockThreadRepository.checkThreadIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.checkCommentIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockLikeRepository.checkLiked = jest
      .fn()
      .mockImplementation(() => Promise.resolve(false));
    mockLikeRepository.deleteLikeComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));

    const addDeleteLikesCommentUseCase = new AddDeleteLikesCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    await addDeleteLikesCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.checkThreadIdAvailability).toBeCalledWith(
      useCasePayload.threadId,
    );
    expect(mockCommentRepository.checkCommentIdAvailability).toBeCalledWith(
      useCasePayload.commentId,
    );
    expect(mockLikeRepository.checkLiked).toBeCalledWith({
      id: useCasePayload.id, commentId: useCasePayload.commentId,
    });
    expect(mockLikeRepository.deleteLikeComment).toBeCalledWith({
      id: useCasePayload.id, commentId: useCasePayload.commentId,
    });
  });
});

const AddedReplyComment = require('../../../Domains/replies/entities/AddedReplyComment');
const ReplyCommentUseCase = require('../ReplyCommentUseCase');
const ReplyRepositoryPostgres = require('../../../Infrastructures/repository/ReplyRepositoryPostgres');
const CommentRepositoryPostgres = require('../../../Infrastructures/repository/CommentRepositoryPostgres');
const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');

describe('AddReplyCommentUseCase', () => {
  it('should orchestrating the add reply comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'lorem ipsum dolor sit amet',
      username: 'Bruce Wayne',
      id: 'user-002',
      threadId: 'thread-001',
      commentId: 'comment-001',
    };

    const mockAddedReplyComment = new AddedReplyComment({
      id: 'reply-001',
      content: useCasePayload.content,
      username: useCasePayload.id,
      is_deleted: false,
      date: '01-01-2024',
    });

    const mockReplyRepository = new ReplyRepositoryPostgres();
    const mockCommentRepository = new CommentRepositoryPostgres();
    const mockThreadRepository = new ThreadRepositoryPostgres();

    mockReplyRepository.replyComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedReplyComment));
    mockThreadRepository.checkThreadIdAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve(true));
    mockCommentRepository.checkCommentIdAvailability = jest.fn()
      .mockImplementation(() => Promise.resolve(true));

    const replyCommentUseCase = new ReplyCommentUseCase({
      replyRepository: mockReplyRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedReplyComment = await replyCommentUseCase.execute(useCasePayload);

    // Assert
    expect(addedReplyComment).toStrictEqual(new AddedReplyComment({
      id: 'reply-001',
      content: 'lorem ipsum dolor sit amet',
      username: 'user-002',
      is_deleted: false,
      date: '01-01-2024',
    }));
    expect(mockThreadRepository.checkThreadIdAvailability).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.checkCommentIdAvailability)
      .toBeCalledWith(useCasePayload.commentId);
    expect(mockReplyRepository.replyComment).toBeCalledWith(useCasePayload);
  });
});

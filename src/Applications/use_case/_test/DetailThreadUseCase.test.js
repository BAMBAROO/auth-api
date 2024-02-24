const ThreadRepositoryPostgres = require('../../../Infrastructures/repository/ThreadRepositoryPostgres');
const DetailThreadUseCase = require('../DetailThreadUseCase');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const Threads = require('../../../Domains/threads/entities/Threads');
const Comments = require('../../../Domains/comments/entities/Comments');
const Replies = require('../../../Domains/replies/entities/Replies');
const ReplyRepositoryPostgres = require('../../../Infrastructures/repository/ReplyRepositoryPostgres');
const CommentRepositoryPostgres = require('../../../Infrastructures/repository/CommentRepositoryPostgres');
const LikesRepositoryPostgres = require('../../../Infrastructures/repository/LikesRepositoryPostgres');

describe('DeteailThreadUseCase', () => {
  it('should orchestrating the detail thread action correctly', async () => {
    const threadId = 'thread-001';

    const useCasePayload = {
      thread: {
        id: threadId,
        title: 'Anies Baswedan',
        body: 'Preside RI 2024',
        date: '2024-01-15T06:52:38.641Z',
        username: 'Hunter',
      },
      comments:
        [
          {
            id: 'comment-001',
            thread_id: threadId,
            username: 'Bruce Wayne',
            content: 'content',
            date: 'now',
            likeCount: 4,
            is_deleted: false,
          },
        ],
      replies:
        [
          {
            id: 'reply-001',
            comment_id: 'comment-001',
            username: 'Bryan Athallah',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
    };

    const mockThreadRepository = new ThreadRepositoryPostgres();
    const mockReplyRepository = new ReplyRepositoryPostgres();
    const mockCommentRepository = new CommentRepositoryPostgres();
    const mockLikeRepository = new LikesRepositoryPostgres();

    mockThreadRepository.threadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(new Threads({
        id: threadId,
        title: 'Anies Baswedan',
        body: 'Preside RI 2024',
        date: '2024-01-15T06:52:38.641Z',
        username: 'Hunter',
      })));
    mockCommentRepository.commentsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(new Comments(useCasePayload)));
    mockReplyRepository.repliesByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(new Replies(useCasePayload)));
    mockThreadRepository.checkThreadIdAvailability = jest
      .fn()
      .mockImplementation(() => Promise.resolve(true));
    mockLikeRepository.likesByCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(4));

    const mockDetailThread = new DetailThread();
    // const mockResult = useCasePayload.thread;
    useCasePayload.thread.comments = mockDetailThread._threadDetail({
      comments: useCasePayload.comments,
      replies: useCasePayload.replies,
    });

    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      replyRepository: mockReplyRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    const detailThread = await detailThreadUseCase.execute(threadId);

    expect(mockThreadRepository.checkThreadIdAvailability).toBeCalledWith(threadId);
    expect(mockThreadRepository.threadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.commentsByThreadId).toBeCalledWith(threadId);
    expect(mockReplyRepository.repliesByThreadId).toBeCalledWith(threadId);
    expect(detailThread).toEqual(useCasePayload.thread);
  });
});

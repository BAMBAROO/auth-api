const DetailThread = require('../../Domains/threads/entities/DetailThread');

class DetailThreadUseCase {
  constructor({
    replyRepository,
    threadRepository,
    commentRepository,
    likeRepository,
  }) {
    this._replyRepository = replyRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._likeRepository = likeRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.checkThreadIdAvailability(useCasePayload);
    // eslint-disable-next-line max-len
    const { thread } = await this._threadRepository.threadById(useCasePayload);
    const { comments } = await this._commentRepository.commentsByThreadId(useCasePayload);
    const { replies } = await this._replyRepository.repliesByThreadId(useCasePayload);
    return Promise.all(comments.map(async (comment) => {
      comment.likeCount = await this._likeRepository.likesByCommentId(comment.id);
      return comment;
    })).then((comment) => {
      const detailThread = new DetailThread();
      thread.comments = detailThread._threadDetail({ comments: comment, replies });
    }).then(() => thread);
  }
}

module.exports = DetailThreadUseCase;

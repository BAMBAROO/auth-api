const DetailThread = require('../../Domains/threads/entities/DetailThread');

class DetailThreadUseCase {
  constructor({ replyRepository, threadRepository, commentRepository }) {
    this._replyRepository = replyRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.checkThreadIdAvailability(useCasePayload);
    // eslint-disable-next-line max-len
    const { thread } = await this._threadRepository.threadById(useCasePayload);
    const { comments } = await this._commentRepository.commentsByThreadId(useCasePayload);
    const { replies } = await this._replyRepository.repliesByThreadId(useCasePayload);
    const detailThread = new DetailThread();
    thread.comments = detailThread._threadDetail({ comments, replies });
    return thread;
  }
}

module.exports = DetailThreadUseCase;

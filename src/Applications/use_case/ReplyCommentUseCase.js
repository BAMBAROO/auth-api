const AddReply = require('../../Domains/replies/entities/AddReply');

class ReplyCommentUseCase {
  constructor({ replyRepository, threadRepository, commentRepository }) {
    this._replyRepository = replyRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const {
      username, id, threadId, commentId, content,
    } = new AddReply(useCasePayload);
    await this._threadRepository.checkThreadIdAvailability(threadId);
    await this._commentRepository.checkCommentIdAvailability(commentId);
    return this._replyRepository.replyComment({
      id,
      username,
      content,
      commentId,
      threadId,
    });
  }
}

module.exports = ReplyCommentUseCase;

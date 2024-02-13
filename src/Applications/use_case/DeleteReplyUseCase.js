const DeleteReply = require('../../Domains/replies/entities/DeleteReply');

class DeleteReplyUseCase {
  constructor({ replyRepository, threadRepository, commentRepository }) {
    this._replyRepository = replyRepository;
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const {
      threadId, commentId, id, replyId,
    } = new DeleteReply(useCasePayload);
    await this._threadRepository.checkThreadIdAvailability(threadId);
    await this._replyRepository.checkReplyIdAvailability(replyId);
    await this._commentRepository.checkCommentIdAvailability(commentId);
    await this._replyRepository.checkReplyOwner({ replyId, id });
    await this._replyRepository.deleteReplyComment({ threadId, replyId, id });
  }
}

module.exports = DeleteReplyUseCase;

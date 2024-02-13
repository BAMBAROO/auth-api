const DeleteThreadComment = require('../../Domains/comments/entities/DeleteThreadComment');

class DeleteThreadCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const { threadId, commentId, id } = new DeleteThreadComment(useCasePayload);
    await this._threadRepository.checkThreadIdAvailability(threadId);
    await this._commentRepository.checkCommentIdAvailability(commentId);
    await this._commentRepository.checkCommentsOwner({ commentId, id });
    await this._commentRepository.deleteThreadComment({ threadId, commentId, id });
  }
}

module.exports = DeleteThreadCommentUseCase;

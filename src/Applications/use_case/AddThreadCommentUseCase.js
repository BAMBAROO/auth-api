const AddThreadComment = require('../../Domains/comments/entities/AddThreadComment');

class AddThreadCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const {
      content, id, username, threadId,
    } = new AddThreadComment(useCasePayload);
    await this._threadRepository.checkThreadIdAvailability(threadId);

    return this._commentRepository.addThreadComment({
      id, username, content, threadId,
    });
  }
}

module.exports = AddThreadCommentUseCase;

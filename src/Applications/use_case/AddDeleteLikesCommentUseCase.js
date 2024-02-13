const AddDeleteLike = require('../../Domains/likes/entities/AddDeleteLike');

class AddDeleteLikesCommentUseCase {
  constructor({ likeRepository, commentRepository, threadRepository }) {
    this._likeRepository = likeRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const { id, commentId, threadId } = new AddDeleteLike(useCasePayload);
    await this._threadRepository.checkThreadIdAvailability(threadId);
    await this._commentRepository.checkCommentIdAvailability(commentId);
    const liked = await this._likeRepository.checkLiked({ id, commentId });
    if (liked) {
      await this._likeRepository.addLikeComment({ id, commentId });
    } else {
      await this._likeRepository.deleteLikeComment({ id, commentId });
    }
  }
}

module.exports = AddDeleteLikesCommentUseCase;

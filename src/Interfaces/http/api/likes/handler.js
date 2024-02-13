const AuthenticationTokenManager = require('../../../../Applications/security/AuthenticationTokenManager');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');
const AddDeleteLikesCommentUseCase = require('../../../../Applications/use_case/AddDeleteLikesCommentUseCase');

class LikesHandler {
  constructor(container) {
    this._container = container;
    this.addDeleteLikeCommentHandler = this.addDeleteLikeCommentHandler.bind(this);
  }

  async addDeleteLikeCommentHandler(request, h) {
    // eslint-disable-next-line prefer-destructuring
    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) {
      return new AuthenticationError('Missing authentication');
    }
    // eslint-disable-next-line max-len
    const authenticationTokenManager = await this._container.getInstance(AuthenticationTokenManager.name);
    // eslint-disable-next-line max-len
    const { id } = await authenticationTokenManager.verifyAccessToken(token);

    const { commentId, threadId } = request.params;
    const addDeleteLikesCommentUseCase = this._container.getInstance(
      AddDeleteLikesCommentUseCase.name,
    );
    await addDeleteLikesCommentUseCase.execute({ id, commentId, threadId });

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = LikesHandler;

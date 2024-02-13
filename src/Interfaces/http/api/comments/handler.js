const AddThreadCommentUseCase = require('../../../../Applications/use_case/AddThreadCommentUseCase');
const DeleteThreadCommentUseCase = require('../../../../Applications/use_case/DeleteThreadCommentUseCase');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');
const AuthenticationTokenManager = require('../../../../Applications/security/AuthenticationTokenManager');

class CommentsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadCommentHandler = this.postThreadCommentHandler.bind(this);
    this.deleteThreadCommentHandler = this.deleteThreadCommentHandler.bind(this);
  }

  async postThreadCommentHandler(request, h) {
    // eslint-disable-next-line prefer-destructuring
    request.payload.token = request.headers?.authorization?.split(' ')[1];
    if (!request.payload.token) {
      return new AuthenticationError('Missing authentication');
    }
    // eslint-disable-next-line max-len
    const authenticationTokenManager = await this._container.getInstance(AuthenticationTokenManager.name);
    // eslint-disable-next-line max-len
    const { id, username } = await authenticationTokenManager.verifyAccessToken(request.payload.token);

    request.payload.id = id;
    request.payload.username = username;
    request.payload.threadId = request.params.threadId;

    const addThreadCommentUseCase = this._container.getInstance(
      AddThreadCommentUseCase.name,
    );
    const addedComment = await addThreadCommentUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteThreadCommentHandler(request, h) {
    // eslint-disable-next-line prefer-destructuring
    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) {
      return new AuthenticationError('Missing authentication');
    }
    const { threadId, commentId } = request.params;
    // eslint-disable-next-line max-len
    const authenticationTokenManager = await this._container.getInstance(AuthenticationTokenManager.name);
    const { id } = await authenticationTokenManager.verifyAccessToken(token);
    const deleteThreadCommentUseCase = this._container.getInstance(
      DeleteThreadCommentUseCase.name,
    );
    await deleteThreadCommentUseCase.execute({ threadId, commentId, id });
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = CommentsHandler;

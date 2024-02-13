const ReplyCommentUseCase = require('../../../../Applications/use_case/ReplyCommentUseCase');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');
const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');
const AuthenticationTokenManager = require('../../../../Applications/security/AuthenticationTokenManager');

class RepliesHandler {
  constructor(container) {
    this._container = container;
    this.replyCommentHandler = this.replyCommentHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async replyCommentHandler(request, h) {
    // eslint-disable-next-line prefer-destructuring
    request.payload.token = request?.headers?.authorization?.split(' ')[1];
    if (!request.payload.token) {
      return new AuthenticationError('Missing authentication');
    }

    // eslint-disable-next-line max-len
    const authenticationTokenManager = await this._container.getInstance(AuthenticationTokenManager.name);
    // eslint-disable-next-line max-len
    const { username, id } = await authenticationTokenManager.verifyAccessToken(request.payload.token);

    request.payload.threadId = request.params.threadId;
    request.payload.commentId = request.params.commentId;
    request.payload.username = username;
    request.payload.id = id;

    const replyCommentUseCase = this._container.getInstance(
      ReplyCommentUseCase.name,
    );
    const addedReply = await replyCommentUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  async deleteReplyHandler(request, h) {
    // eslint-disable-next-line prefer-destructuring
    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) {
      return new AuthenticationError('Missing authentication');
    }
    // eslint-disable-next-line max-len
    const authenticationTokenManager = await this._container.getInstance(AuthenticationTokenManager.name);
    const { id } = await authenticationTokenManager.verifyAccessToken(token);
    const { threadId, commentId, replyId } = request.params;
    const deleteReplyUseCase = this._container.getInstance(
      DeleteReplyUseCase.name,
    );
    await deleteReplyUseCase.execute({
      threadId, commentId, replyId, id,
    });
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = RepliesHandler;

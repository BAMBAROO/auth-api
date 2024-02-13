const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const DetailThreadUseCase = require('../../../../Applications/use_case/DetailThreadUseCase');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');
const AuthenticationTokenManager = require('../../../../Applications/security/AuthenticationTokenManager');

class ThreadsHandler {
  constructor(container) {
    this._container = container;
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.detailThreadHandler = this.detailThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    // eslint-disable-next-line prefer-destructuring
    if (!request.headers?.authorization?.split(' ')[1]) {
      return new AuthenticationError('Missing authentication');
    }
    request.payload.token = request.headers?.authorization?.split(' ')[1];
    // eslint-disable-next-line max-len
    const authenticationTokenManager = await this._container.getInstance(AuthenticationTokenManager.name);
    // eslint-disable-next-line max-len
    const { username, id } = await authenticationTokenManager.verifyAccessToken(request.payload.token);
    request.payload.username = username;
    request.payload.id = id;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async detailThreadHandler(request, h) {
    const detailThreadUseCase = this._container.getInstance(
      DetailThreadUseCase.name,
    );
    const thread = await detailThreadUseCase.execute(request.params.threadId);
    const response = h.response({
      status: 'success',
      data: {
        thread,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;

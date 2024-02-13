class AuthenticationTokenManager {
  // eslint-disable-next-line class-methods-use-this
  async createRefreshToken() {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  // eslint-disable-next-line class-methods-use-this
  async createAccessToken() {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  // eslint-disable-next-line class-methods-use-this
  async verifyRefreshToken() {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  // eslint-disable-next-line class-methods-use-this
  async verifyAccessToken() {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  // eslint-disable-next-line class-methods-use-this
  async decodePayload() {
    throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthenticationTokenManager;

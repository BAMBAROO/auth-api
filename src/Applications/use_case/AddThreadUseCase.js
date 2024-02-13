const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const {
      body, title, id, username,
    } = new AddThread(useCasePayload);

    return this._threadRepository.addThread({
      id, title, username, body,
    });
  }
}

module.exports = AddThreadUseCase;

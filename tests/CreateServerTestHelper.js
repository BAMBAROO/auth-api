const container = require('../src/Infrastructures/container');
const createServer = require('../src/Infrastructures/http/createServer');

const CreateServerTestHelper = {
  async accessTokenHelper({ username = 'ASD', password = 'ASD', fullname = 'ASD' }) {
    const server = await createServer(container);
    const payload = {
      username,
      password,
      fullname,
    };

    await server.inject({
      method: 'POST',
      url: '/users',
      payload,
    });

    const response = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: {
        username: payload.username,
        password: payload.password,
      },
    });

    const { accessToken } = JSON.parse(response.payload).data;

    return accessToken;
  },
};

module.exports = CreateServerTestHelper;

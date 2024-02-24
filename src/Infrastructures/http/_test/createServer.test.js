const createServer = require('../createServer');

describe('createServer', () => {
  it('should get error response', async () => {
    const server = await createServer({});

    const response = await server.inject({
      method: 'GET',
      url: '/asdasd',
    });

    expect(response.statusCode).toEqual(404);
  });

  it('should get error response', async () => {
    const payload = {
      username: 'asd',
      fullname: 'asd asd',
      password: 'asdasd',
    };
    const server = await createServer({}); // fake injection

    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload,
    });

    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });
});

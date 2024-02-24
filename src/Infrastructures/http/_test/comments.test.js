const Jwt = require('@hapi/jwt');
const CommentTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');
const container = require('../../container');
const CreateServerTestHelper = require('../../../../tests/CreateServerTestHelper');
const JwtTokenManager = require('../../security/JwtTokenManager');

describe('/comment api', () => {
  beforeAll(async () => {
    await CommentTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await CommentTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe('POST /threads/{threadId}/comments', () => {
    it('should fail 400', async () => {
      const payload = { };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      const accessToken = await CreateServerTestHelper.accessTokenHelper({});
      const server = await createServer(container);
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-001/comments',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('ADD_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      expect(response.statusCode).toEqual(400);
    });

    it('should fail 401 Missing authentication', async () => {
      const payload = { };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      const server = await createServer(container);
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-001/comments',
        payload,
        headers: {
          Authorization: 'Bearer ',
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Missing authentication');
      expect(response.statusCode).toEqual(401);
    });

    it('should fail 401 Missing authentication', async () => {
      const payload = { };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({ threadId: 'thread-001' });
      const server = await createServer(container);
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-001/comments/comment-123',
        payload,
        headers: {
          Authorization: 'Bearer ',
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Missing authentication');
      expect(response.statusCode).toEqual(401);
    });

    it('should success 201', async () => {
      const payload = {
        content: 'asd',
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      const accessToken = await CreateServerTestHelper.accessTokenHelper({});
      const server = await createServer(container);
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-001/comments',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('success');
      expect(response.statusCode).toEqual(201);
      expect(responseJson.data.addedComment.id).toBeDefined();
      expect(responseJson.data.addedComment.content).toEqual(payload.content);
      expect(responseJson.data.addedComment.owner).toBeDefined();
    });
  });

  describe('DELETE /threads/{threadId}/comments/{commentId}', () => {
    it('should fail 400', async () => {
      const accessToken = await CreateServerTestHelper.accessTokenHelper({});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({ threadId: 'thread-001' });
      const server = await createServer(container);
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-001/comments/comment-123',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('anda bukan pemilik komentar');
      expect(response.statusCode).toEqual(403);
    });

    it('should success 200', async () => {
      const accessToken = await CreateServerTestHelper.accessTokenHelper({
        username: 'bryan',
        password: 'bryan',
        fullname: 'bryan bryan',
      });
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const { id } = await jwtTokenManager.decodePayload(accessToken);
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({
        threadId: 'thread-001',
        user_id: id,
      });
      const server = await createServer(container);
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-001/comments/comment-123',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('success');
      expect(response.statusCode).toEqual(200);
    });
  });
});

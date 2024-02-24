const Jwt = require('@hapi/jwt');
const CommentTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');
const container = require('../../container');
const CreateServerTestHelper = require('../../../../tests/CreateServerTestHelper');
const JwtTokenManager = require('../../security/JwtTokenManager');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');

describe('/replies api', () => {
  beforeAll(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe('POST /threads/{threadId}/comments/{commentId}/replies', () => {
    it('should fail 400', async () => {
      const payload = { };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({ threadId: 'thread-001' });
      const accessToken = await CreateServerTestHelper.accessTokenHelper({});
      const server = await createServer(container);
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments/{commentId}/replies',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
      expect(response.statusCode).toEqual(400);
    });

    it('should fail 401 Missing authentication', async () => {
      const payload = {
        content: 'asd',
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({ threadId: 'thread-001' });
      const server = await createServer(container);
      const response = await server.inject({
        method: 'POST',
        url: '/threads/{threadId}/comments/{commentId}/replies',
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

    it('should fail 404 komentar id tidak valid', async () => {
      const payload = {
        content: 'asd',
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({ threadId: 'thread-001' });
      const accessToken = await CreateServerTestHelper.accessTokenHelper({});
      const server = await createServer(container);
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-001/comments/comment-111/replies',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('komentar id tidak valid');
      expect(response.statusCode).toEqual(404);
    });

    it('should fail 404 thread id tidak valid', async () => {
      const payload = {
        content: 'asd',
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({ threadId: 'thread-001' });
      const accessToken = await CreateServerTestHelper.accessTokenHelper({});
      const server = await createServer(container);
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-101/comments/comment-123/replies',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('thread id tidak valid');
      expect(response.statusCode).toEqual(404);
    });

    it('should success 201', async () => {
      const payload = {
        content: 'asd',
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({ threadId: 'thread-001' });
      const accessToken = await CreateServerTestHelper.accessTokenHelper({});
      const server = await createServer(container);
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-001/comments/comment-123/replies',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('success');
      expect(response.statusCode).toEqual(201);
    });
  });

  describe('DELETE /threads/{threadId}/comments/{commentId}', () => {
    it('should success 200', async () => {
      const payload = {
        content: 'asd',
      };
      const accessToken = await CreateServerTestHelper.accessTokenHelper({});
      const jwtTokenManager = new JwtTokenManager(Jwt.token);
      const { id } = await jwtTokenManager.decodePayload(accessToken);
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({ threadId: 'thread-001' });
      await RepliesTableTestHelper.addReply({
        threadId: 'thread-001',
        commentId: 'comment-123',
        userId: id,
      });
      const server = await createServer(container);
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-001/comments/comment-123/replies/reply-123',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('success');
      expect(response.statusCode).toEqual(200);
    });

    it('should fail 401 Missing authentication', async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({
        threadId: 'thread-001',
      });
      await RepliesTableTestHelper.addReply({
        threadId: 'thread-001',
        commentId: 'comment-123',
        replyId: 'reply-123',
      });
      const server = await createServer(container);
      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-001/comments/comment-123/replies/reply-123',
        headers: {
          Authorization: 'Bearer ',
        },
      });
      const responseJson = JSON.parse(response.payload);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Missing authentication');
      expect(response.statusCode).toEqual(401);
    });
  });
});

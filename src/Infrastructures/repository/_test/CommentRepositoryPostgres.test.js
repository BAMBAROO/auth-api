const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const AddedThreadComment = require('../../../Domains/comments/entities/AddedThreadComment');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');

describe('CommentRepositoryPostgres', () => {
  beforeAll(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await UsersTableTestHelper.addUser({ id: 'user-099', username: 'Bruce Wayne' });
    await UsersTableTestHelper.addUser({});
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await UsersTableTestHelper.addUser({ id: 'user-099', username: 'Bruce Wayne' });
    await UsersTableTestHelper.addUser({});
  });

  afterAll(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('AddThreadComment and DeleteThreadComment function', () => {
    it('should success add thread comment', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const commentRepositoryPostgres = new CommentRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await ThreadsTableTestHelper.addThread({});
      const thread = await ThreadsTableTestHelper.getThread();
      const payload = {
        username: 'bryan',
        content: 'comment',
        threadId: thread[0].id,
        id: 'user-123',
      };

      const result = await commentRepositoryPostgres.addThreadComment(payload);
      const comment = await CommentsTableTestHelper.findCommentById('comment-123');

      expect(comment).toHaveLength(1);
      expect(result).toEqual(new AddedThreadComment({
        id: 'comment-123',
        content: 'comment',
        user_id: 'user-123',
      }));
    });

    it('should success delete thread comment', async () => {
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);

      const payload = {
        threadId: 'thread-001',
        commentId: 'comment-123',
        id: 'user-123',
      };

      const result = await commentRepositoryPostgres.deleteThreadComment(payload);
      const comment = await CommentsTableTestHelper.findCommentById('comment-123');

      expect(comment).toHaveLength(1);
      expect(comment[0].is_deleted).toEqual(true);
      expect(result).toBe(true);
    });
  });

  describe('commentsByThreadId function', () => {
    it('should be success get commentsByThreadId', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });

      const { comments } = await commentRepositoryPostgres.commentsByThreadId('thread-001');

      expect(comments[0].id).toEqual('comment-123');
      expect(comments[0].content).toEqual('content 123');
      expect(comments[0].date).not.toBe(undefined);
      expect(comments[0].username).toEqual('bruce');
      expect(comments[0].is_deleted).toEqual(false);
    });

    it('should be get undefined commentsByThreadId', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });

      const { comments } = await commentRepositoryPostgres.commentsByThreadId('thread-002');

      expect(comments).toHaveLength(0);
    });
  });

  describe('checkCommentIdAvailability function', () => {
    it('should be success checkCommentIdAvailability', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });

      const result = commentRepositoryPostgres.checkCommentIdAvailability('comment-123');

      await expect(result)
        .resolves
        .toBe(true);
      await expect(result)
        .resolves.not
        .toThrowError('komentar id tidak valid');
      await expect(result)
        .resolves.not
        .toThrowError(NotFoundError);
    });

    it('should be fail checkCommentIdAvailability', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });

      const result = commentRepositoryPostgres.checkCommentIdAvailability('comment-001');

      await expect(result)
        .rejects
        .toThrowError('komentar id tidak valid');
      await expect(result)
        .rejects
        .toThrowError(NotFoundError);
    });
  });

  describe('checkCommentsOwner function', () => {
    it('should be success checkCommentsOwner', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({
        threadId: 'thread-001',
        user_id: 'user-099',
      });

      const result = await commentRepositoryPostgres.checkCommentsOwner({
        commentId: 'comment-123',
        id: 'user-099',
      });

      expect(result).toBe(true);
    });

    it('should be fail checkThreadIdAvailability', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({
        threadId: 'thread-001',
        user_id: 'user-099',
      });

      const result = commentRepositoryPostgres.checkCommentsOwner({
        commentId: 'comment-123',
        id: 'user-90',
      });

      await expect(result)
        .rejects
        .toThrowError('anda bukan pemilik komentar');
      await expect(result)
        .rejects
        .toThrowError(AuthorizationError);
    });
  });
});

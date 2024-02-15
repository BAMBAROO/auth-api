const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const AddedReplyComment = require('../../../Domains/replies/entities/AddedReplyComment');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');

describe('ThreadRepositoryPostgres', () => {
  beforeAll(async () => {
    await LikesTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await UsersTableTestHelper.addUser({});
  });

  afterEach(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await UsersTableTestHelper.addUser({});
  });

  afterAll(async () => {
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('ReplyComment and DeleteReplyComment function', () => {
    it('should success reply comment', async () => {
      function fakeGeneratorId() {
        return '123';
      }
      await ThreadsTableTestHelper.addThread({});
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeGeneratorId,
      );

      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });

      const payload = {
        username: 'bryan',
        commentId: 'comment-123',
        content: 'content reply',
        threadId: 'thread-001',
        id: 'user-123',
      };

      const result = await replyRepositoryPostgres.replyComment(payload);
      const reply = await RepliesTableTestHelper.findReplyById('reply-123');

      expect(reply).toHaveLength(1);
      expect(result).toStrictEqual(new AddedReplyComment({
        id: 'reply-123',
        content: 'content reply',
        username: 'bryan',
      }));
    });

    it('should success delete reply comment', async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool);

      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      await RepliesTableTestHelper.addReply({
        userId: 'user-123',
        threadId: 'thread-001',
        commentId: 'comment-123',
      });

      const payload = {
        threadId: 'thread-001',
        replyId: 'reply-123',
        id: 'user-123',
      };
      const result = await replyRepositoryPostgres.deleteReplyComment(payload);
      const reply = await RepliesTableTestHelper.getReplies();

      expect(reply.length).toEqual(1);
      expect(reply[0].is_deleted).toEqual(true);
      expect(result).toEqual(true);
    });
  });

  describe('repliesByThreadId function', () => {
    it('should be success get repliesByThreadId', async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      await RepliesTableTestHelper.addReply({
        threadId: 'thread-001',
        commentId: 'comment-123',
      });

      const { replies } = await replyRepositoryPostgres.repliesByThreadId('thread-001');

      expect(replies[0].id).toEqual('reply-123');
      expect(replies[0].content).toEqual('content 123');
      expect(replies[0].date).not.toBe(undefined);
      expect(replies[0].username).toEqual('bruce');
      expect(replies[0].comment_id).toEqual('comment-123');
      expect(replies[0].is_deleted).toEqual(false);
    });

    it('should be success get repliesByThreadId', async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      await RepliesTableTestHelper.addReply({
        threadId: 'thread-001',
        commentId: 'comment-123',
      });

      const { replies } = await replyRepositoryPostgres.repliesByThreadId('thread-101');

      expect(replies).toHaveLength(0);
    });
  });

  describe('checkReplyIdAvailability function', () => {
    it('should be success checkReplyIdAvailability', async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      await RepliesTableTestHelper.addReply({
        threadId: 'thread-001',
        commentId: 'comment-123',
      });

      await expect(replyRepositoryPostgres.checkReplyIdAvailability('reply-123'))
        .resolves
        .toBe(true);
      await expect(replyRepositoryPostgres.checkReplyIdAvailability('reply-123'))
        .resolves.not
        .toThrowError('balasan id tidak valid');
      await expect(replyRepositoryPostgres.checkReplyIdAvailability('reply-123'))
        .resolves.not
        .toThrowError(NotFoundError);
    });

    it('should be fail checkReplyIdAvailability', async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });

      await expect(replyRepositoryPostgres.checkReplyIdAvailability('reply-123'))
        .rejects
        .toThrowError('balasan id tidak valid');
      await expect(replyRepositoryPostgres.checkReplyIdAvailability('reply-123'))
        .rejects
        .toThrowError(NotFoundError);
    });
  });

  describe('checkReplyOwner function', () => {
    it('should be success checkReplyOwner', async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({
        threadId: 'thread-001',
        user_id: 'user-123',
      });
      await RepliesTableTestHelper.addReply({
        threadId: 'thread-001',
        commentId: 'comment-123',
        id: 'reply-001',
        userId: 'user-123',
      });

      await expect(replyRepositoryPostgres.checkReplyOwner({
        replyId: 'reply-001',
        id: 'user-123',
      }))
        .resolves
        .toBe(true);
    });

    it('should be fail checkThreadIdAvailability', async () => {
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({
        threadId: 'thread-001',
        user_id: 'user-123',
      });
      await RepliesTableTestHelper.addReply({
        threadId: 'thread-001',
        commentId: 'comment-123',
        id: 'reply-001',
        userId: 'user-123',
      });

      await expect(replyRepositoryPostgres.checkReplyOwner({
        replyId: 'reply-001',
        id: 'user-90',
      }))
        .rejects
        .toThrowError('anda bukan pemilik komentar');
      await expect(replyRepositoryPostgres.checkReplyOwner({
        replyId: 'reply-001',
        id: 'user-90',
      }))
        .rejects
        .toThrowError(AuthorizationError);
    });
  });
});

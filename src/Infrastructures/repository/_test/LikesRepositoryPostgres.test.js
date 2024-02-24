const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');
const LikesRepositoryPostgres = require('../LikesRepositoryPostgres');

describe('LikesRepositoryPostgres', () => {
  beforeAll(async () => {
    await LikesTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await UsersTableTestHelper.addUser({ id: 'user-099', username: 'Bruce Wayne' });
    await UsersTableTestHelper.addUser({});
  });

  afterEach(async () => {
    await LikesTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await UsersTableTestHelper.addUser({ id: 'user-099', username: 'Bruce Wayne' });
    await UsersTableTestHelper.addUser({});
  });

  afterAll(async () => {
    await LikesTableTestHelper.cleanTable();
    await RepliesTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('AddLikeComment function', () => {
    it('should success add like comment', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const likesRepositoryPostgres = new LikesRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      const payload = {
        commentId: 'comment-123',
        threadId: 'thread-001',
        id: 'user-123',
      };

      await expect(likesRepositoryPostgres.addLikeComment(payload))
        .resolves
        .toBe(true);
    });

    it('should fail add like comment', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const likesRepositoryPostgres = new LikesRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });

      const payload = {
        commentId: 'comment-321',
        threadId: 'thread-001',
        id: 'user-123',
      };

      await expect(likesRepositoryPostgres.addLikeComment(payload))
        .rejects
        .not
        .toBe(true);
    });
  });

  describe('DeleteLikeComment function', () => {
    it('should success delete like comment', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const likesRepositoryPostgres = new LikesRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      await LikesTableTestHelper.addLikes({});
      const payload = {
        commentId: 'comment-123',
        threadId: 'thread-001',
        id: 'user-123',
      };

      await expect(likesRepositoryPostgres.deleteLikeComment(payload))
        .resolves
        .toBe(true);
    });

    it('should fail add like comment', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const likesRepositoryPostgres = new LikesRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });

      const payload = {
        commentId: 'comment-321',
        threadId: 'thread-001',
        id: 'user-123',
      };

      await expect(likesRepositoryPostgres.addLikeComment(payload))
        .rejects
        .not
        .toBe(true);
    });
  });

  describe('checkLiked function', () => {
    it('should return true', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const likesRepositoryPostgres = new LikesRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      await LikesTableTestHelper.addLikes({});
      const payload = {
        id: 'user-123',
        commentId: 'comment-123',
      };
      await expect(likesRepositoryPostgres.checkLiked(payload))
        .resolves
        .toBe(false);
    });

    it('should return true', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const likesRepositoryPostgres = new LikesRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      const payload = {
        id: 'user-123',
        commentId: 'comment-123',
      };
      await expect(likesRepositoryPostgres.checkLiked(payload))
        .resolves
        .toBe(true);
    });
  });

  describe('likesByCommentId function', () => {
    it('should return true', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const likesRepositoryPostgres = new LikesRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      // await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({});
      await CommentsTableTestHelper.addComment({ threadId: 'thread-001' });
      await LikesTableTestHelper.addLikes({});
      await LikesTableTestHelper.addLikes({
        id: 'likes-002',
        userId: 'user-099',
      });
      const result = await likesRepositoryPostgres.likesByCommentId('comment-123');
      await expect(result)
        .toBe(2);
    });
  });
});

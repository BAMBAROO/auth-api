const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const RepliesTableTestHelper = require('../../../../tests/RepliesTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');

describe('ThreadRepositoryPostgres', () => {
  beforeAll(async () => {
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

  describe('AddThread function', () => {
    it('should success add thread', async () => {
      function fakeIdGenerator() {
        return '123';
      }
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator,
      );
      const payload = {
        body: 'body 123',
        title: 'title 123',
        username: 'bruce',
        id: 'user-123',
      };

      const result = await threadRepositoryPostgres.addThread(payload);
      const thread = await ThreadsTableTestHelper.findThreadById('thread-123');

      expect(thread).toHaveLength(1);
      expect(result).toEqual(new AddedThread({
        id: 'thread-123',
        title: 'title 123',
        user_id: 'user-123',
      }));
    });
  });

  describe('threadById function', () => {
    it('should be success get threadById', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});

      const { thread } = await threadRepositoryPostgres.threadById('thread-001');

      expect(thread.id).toEqual('thread-001');
      expect(thread.title).toEqual('title');
      expect(thread.body).toEqual('body');
      expect(thread.date).not.toBe(undefined);
      expect(thread.username).toEqual('bruce');
    });
  });

  describe('checkThreadIdAvailability function', () => {
    it('should be success checkThreadIdAvailability', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});

      const result = threadRepositoryPostgres.checkThreadIdAvailability('thread-001');

      await expect(result)
        .resolves
        .toBe(true);
      await expect(result)
        .resolves.not
        .toThrowError('thread id tidak valid');
      await expect(result)
        .resolves.not
        .toThrowError(NotFoundError);
    });

    it('should be fail checkThreadIdAvailability', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool);
      await ThreadsTableTestHelper.addThread({});

      const result = threadRepositoryPostgres.checkThreadIdAvailability('thread-002');

      await expect(result)
        .rejects
        .toThrowError('thread id tidak valid');
      await expect(result)
        .rejects
        .toThrowError(NotFoundError);
    });
  });
});

const DetailThread = require('../DetailThread');
const DetailReplyComment = require('../../../replies/entities/DetailReplyComment');

describe('DetailThread Entities', () => {
  describe('testing comments return in DetailThread()', () => {
    it('should success to get detail comment', () => {
      const payload = {
        thread: {
          id: 'thread-001',
          title: 'Anies Baswedan',
          body: 'Preside RI 2024',
          date: '2024-01-15T06:52:38.641Z',
          username: 'Hunter',
        },
        comments: [
          {
            id: 'comment-001',
            thread_id: 'thread-001',
            username: 'Bruce Wayne',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
        replies: [
          {
            id: 'reply-001',
            comment_id: 'comment-001',
            username: 'Bryan Athallah',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
      };
      const mockDetailComment = [{
        id: 'comment-001',
        username: 'Bruce Wayne',
        content: 'content',
        date: 'now',
        replies: [
          {
            id: 'reply-001',
            date: 'now',
            username: 'Bryan Athallah',
            content: 'content',
          },
        ],
      }];
      const detailThread = new DetailThread(payload);
      const detailComment = detailThread._threadDetail({
        comments: payload.comments,
        replies: payload.replies,
      });
      expect(detailThread).toEqual({});
      expect(detailThread).not.toEqual(undefined);
      expect(detailComment).toEqual(mockDetailComment);
    });

    it('should return new DetailThreadComment() with replies empty array', () => {
      const payload = {
        thread: {
          id: 'thread-001',
          title: 'Anies Baswedan',
          body: 'Preside RI 2024',
          date: '2024-01-15T06:52:38.641Z',
          username: 'Hunter',
        },
        comments: [
          {
            id: 'comment-001',
            thread_id: 'thread-001',
            username: 'Bruce Wayne',
            content: 'content',
            date: 'now',
            is_deleted: true,
          },
        ],
        replies: [
          {
            id: 'reply-001',
            comment_id: 'comment-001',
            username: 'Bryan Athallah',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
      };

      const mockResult = [{
        id: 'comment-001',
        date: 'now',
        content: '**komentar telah dihapus**',
        username: 'Bruce Wayne',
        replies: [],
      }];

      const detailThread = new DetailThread(payload);
      const result = detailThread._threadDetail({
        comments: payload.comments,
        replies: payload.replies,
      });

      expect(detailThread).toEqual({});
      expect(detailThread).not.toEqual(undefined);
      expect(result).toEqual(mockResult);
    });
  });

  describe('testing replies return in DetailThread()', () => {
    it('should return detail replies correctly', () => {
      const payload = {
        thread: {
          id: 'thread-001',
          title: 'Anies Baswedan',
          body: 'Preside RI 2024',
          date: '2024-01-15T06:52:38.641Z',
          username: 'Hunter',
        },
        comments: [
          {
            id: 'comment-001',
            thread_id: 'thread-001',
            username: 'Bruce Wayne',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
        replies: [
          {
            id: 'reply-001',
            comment_id: 'comment-001',
            username: 'Bryan Athallah',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
      };

      const mockResult = [{
        id: 'comment-001',
        date: 'now',
        content: 'content',
        username: 'Bruce Wayne',
        replies: [
          {
            id: 'reply-001',
            date: 'now',
            username: 'Bryan Athallah',
            content: 'content',
          },
        ],
      }];

      const detailThread = new DetailThread(payload);
      const result = detailThread._threadDetail({
        comments: payload.comments,
        replies: payload.replies,
      });

      expect(detailThread).toEqual({});
      expect(detailThread).not.toEqual(undefined);
      expect(result[0].replies[0]).toEqual(new DetailReplyComment({
        id: 'reply-001',
        comment_id: 'comment-001',
        username: 'Bryan Athallah',
        content: 'content',
        date: 'now',
        is_deleted: false,
      }));
      expect(result).toEqual(mockResult);
    });

    it('should not return detail replies', () => {
      const payload = {
        thread: {
          id: 'thread-001',
          title: 'Anies Baswedan',
          body: 'Preside RI 2024',
          date: '2024-01-15T06:52:38.641Z',
          username: 'Hunter',
        },
        comments: [
          {
            id: 'comment-001',
            thread_id: 'thread-001',
            username: 'Bruce Wayne',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
        replies: [
          {
            id: 'reply-001',
            comment_id: 'comment-002',
            username: 'Bryan Athallah',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
      };

      const mockResult = [{
        id: 'comment-001',
        date: 'now',
        content: 'content',
        username: 'Bruce Wayne',
        replies: [],
      }];

      const detailThread = new DetailThread(payload);
      const result = detailThread._threadDetail({
        comments: payload.comments,
        replies: payload.replies,
      });

      expect(detailThread).toEqual({});
      expect(detailThread).not.toEqual(undefined);
      expect(result).toEqual(mockResult);
      expect(result[0].replies).toEqual([]);
      expect(result[0].replies).toHaveLength(0);
    });
  });

  describe('should be success when payload and everything is correct', () => {
    it('should not throw error when payload data are valid', () => {
      const payload = {
        thread: {
          id: 'thread-001',
          title: 'Anies Baswedan',
          body: 'Preside RI 2024',
          date: '2024-01-15T06:52:38.641Z',
          username: 'Hunter',
        },
        comments: [
          {
            id: 'comment-001',
            thread_id: 'thread-001',
            username: 'Bruce Wayne',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
        replies: [
          {
            id: 'reply-001',
            comment_id: 'comment-001',
            username: 'Bryan Athallah',
            content: 'content',
            date: 'now',
            is_deleted: false,
          },
        ],
      };

      const mockResult = {
        id: 'thread-001',
        title: 'Anies Baswedan',
        body: 'Preside RI 2024',
        date: '2024-01-15T06:52:38.641Z',
        username: 'Hunter',
        comments: [
          {
            id: 'comment-001',
            date: 'now',
            content: 'content',
            username: 'Bruce Wayne',
            replies: [
              {
                id: 'reply-001',
                date: 'now',
                username: 'Bryan Athallah',
                content: 'content',
              },
            ],
          },
        ],
      };

      const detailThread = new DetailThread(payload);
      const result = payload.thread;
      result.comments = detailThread._threadDetail({
        comments: payload.comments,
        replies: payload.replies,
      });

      expect(detailThread).not.toEqual(undefined);
      expect(result).toEqual(mockResult);
    });
  });
});

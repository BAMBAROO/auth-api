const DetailReplyComment = require('../../replies/entities/DetailReplyComment');
const DetailThreadComment = require('../../comments/entities/DetailThreadComment');

class DetailThread {
  // eslint-disable-next-line class-methods-use-this
  _threadDetail({ comments, replies }) {
    return comments.map((comment) => {
      if (comment.is_deleted) {
        return new DetailThreadComment(comment);
      }
      // eslint-disable-next-line array-callback-return,consistent-return
      const repliesResult = replies.map((reply) => {
        if (comment.id === reply.comment_id) {
          const {
            id, date, username, content,
          } = new DetailReplyComment(reply);
          return {
            id,
            date,
            username,
            content,
          };
        }
      });
      const detailComment = new DetailThreadComment(comment);
      // eslint-disable-next-line no-unused-expressions,no-param-reassign
      detailComment.replies = repliesResult.filter((t) => t !== undefined);
      return detailComment;
    });
  }
}

module.exports = DetailThread;

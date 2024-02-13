const routes = (handler) => ([
  {
    method: 'PUT',
    path: '/threads/{threadId}/comments/{commentId}/likes',
    handler: handler.addDeleteLikeCommentHandler,
  },
]);

module.exports = routes;

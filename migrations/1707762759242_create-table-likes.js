/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('likes', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
      unique: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      references: 'users',
      notNull: true,
    },
    comment_id: {
      type: 'VARCHAR(50)',
      references: 'comments',
      notNull: true,
    },
  });
  pgm.addConstraint('likes', 'fk_user_likes_id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });
  pgm.addConstraint('likes', 'fk_comments_likes_id', {
    foreignKeys: {
      columns: 'comment_id',
      references: 'comments(id)',
    },
  });
  pgm.createIndex('likes', 'id');
};

exports.down = (pgm) => {
  pgm.dropTable('likes');
};

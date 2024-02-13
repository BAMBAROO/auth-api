/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('comments', {
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
    thread_id: {
      type: 'VARCHAR(50)',
      references: 'threads',
      notNull: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    is_deleted: {
      type: 'BOOLEAN',
      notNull: true,
      default: false,
    },
    like_count: {
      type: 'integer',
      notNull: true,
      default: 0,
    },
  });
  pgm.addConstraint('comments', 'fk_user_comment_id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });
  pgm.addConstraint('comments', 'fk_thread_comment_id', {
    foreignKeys: {
      columns: 'thread_id',
      references: 'threads(id)',
    },
  });
  pgm.createIndex('comments', 'id');
};

exports.down = (pgm) => {
  pgm.dropTable('comments');
};

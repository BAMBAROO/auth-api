/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('replies', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
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
      default: false,
    },
  });
  pgm.addConstraint('replies', 'fk_comment_reply_id', {
    foreignKeys: {
      columns: 'comment_id',
      references: 'comments(id)',
    },
  });
  pgm.createIndex('replies', 'id');
};

exports.down = (pgm) => {
  pgm.dropTable('replies');
};

/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
      unique: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      references: 'users',
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
  pgm.addConstraint('threads', 'fk_user_id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });
  pgm.createIndex('threads', 'id');
};

exports.down = (pgm) => {
  pgm.dropTable('threads');
};

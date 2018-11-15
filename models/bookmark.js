'use strict';

var models = require('./index');

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('Bookmark', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: Sequelize.STRING,
    post_id: Sequelize.INTEGER
  }, {
    tableName: 'bookmarks'
  })
}

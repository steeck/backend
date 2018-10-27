'use strict';

var models = require('./index');

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('Post', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: Sequelize.STRING,
    rate: Sequelize.INTEGER,
    author: Sequelize.STRING,
    permlink: Sequelize.STRING,
    title: Sequelize.STRING,
    thumbnail: Sequelize.STRING,
    contents: Sequelize.JSON,
    json_metadata: Sequelize.JSON,
    active_votes: Sequelize.INTEGER,
    children: Sequelize.INTEGER
  }, {
    tableName: 'posts'
  })
}

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
    layout: Sequelize.JSON,
    json_metadata: Sequelize.JSON,
    active_votes: Sequelize.JSON,
    net_votes: Sequelize.INTEGER,
    children: Sequelize.INTEGER,
    pending_payout_value: Sequelize.DOUBLE
  }, {
    tableName: 'posts'
  })
}

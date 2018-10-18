'use strict';

var models = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: DataTypes.STRING,
    permlink: DataTypes.STRING, //article link
    contents: DataTypes.JSON, //contents  {title: {url:, text:}, {contents: {url, text}, {...} }}
    json_metadata: DataTypes.JSON //metadata
  }, {
    tableName: 'posts'
  })

  return Post
}

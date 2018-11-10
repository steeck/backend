'use strict';

var models = require('./index');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Steecky', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    type: DataTypes.STRING,
    point: DataTypes.INTEGER,
    permlink: DataTypes.STRING
  }, {
    tableName: 'steecky'
  })
}

'use strict';

var models = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Delegation = sequelize.define('Delegation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    sp: DataTypes.DOUBLE,
    vests: DataTypes.DOUBLE,
    days: DataTypes.INTEGER
  }, {
    tableName: 'delegations'
  })

  return Delegation
}

'use strict';

var models = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Delegation = sequelize.define('Delegation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    amount: DataTypes.DOUBLE
  }, {
    tableName: 'delegations'
  })

  return Delegation
}

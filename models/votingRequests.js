'use strict';

var models = require('./index');

module.exports = (sequelize, DataTypes) => {
  const VotingRequests = sequelize.define('VotingRequests', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    url: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    payment_type: DataTypes.STRING
  }, {
    tableName: 'voting_requests'
  })

  return VotingRequests
}

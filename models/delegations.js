module.exports = (sequelize, type) => {
  var Delegation = sequelize.define('delegations', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: type.INTEGER,
    from: type.STRING,
    to: type.STRING,
    amount: type.DOUBLE
  })

  return Delegation
}

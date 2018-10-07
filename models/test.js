module.exports = (sequelize, type) => {
  return sequelize.define('tests', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: type.STRING
  })
}

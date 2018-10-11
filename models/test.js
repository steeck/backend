module.exports = (sequelize, type) => {
  var Test = sequelize.define('tests', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING
  })

  return Test
}

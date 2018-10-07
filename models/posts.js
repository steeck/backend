module.exports = (sequelize, type) => {
  return sequelize.define('posts', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: type.STRING,
      permlink: type.STRING, //article link
      contents: type.JSON //contents  {title: {url:, text:}, {contents: {url, text}, {...} }}
  })
}

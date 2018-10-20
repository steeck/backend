'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
require('dotenv').config()

// var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.js')[env];
var sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USERNAME, process.env.SQL_PASSWORD, {
  host: process.env.SQL_HOST,
  dialect: process.env.SQL_DIALECT,
  port: process.env.SQL_PORT,
  operatorsAliases: false,
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    updatedAt: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30,
    idle: 10
  }
})
var db = {};
// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

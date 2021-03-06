'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
require('dotenv').config()

// var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.js')[env];

var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  timezone: '+09:00',
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
    max: 200,
    min: 10,
    acquire: 20000,
    idle: 20000
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

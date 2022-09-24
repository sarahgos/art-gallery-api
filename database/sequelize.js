const Sequelize = require('sequelize');

module.exports = new Sequelize('artgallery', 'root', 'password', {
    dialect: 'mariadb'
  })
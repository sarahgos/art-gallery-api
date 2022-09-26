const Sequelize = require('sequelize');
const mariadb = require('mariadb');

module.exports = new Sequelize('artgallery', 'root', 'password', {
    dialect: 'mariadb'
  })
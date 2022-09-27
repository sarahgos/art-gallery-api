var DataTypes = require("sequelize").DataTypes;
var _artefacts = require("./artefacts");
var _artists = require("./artists");
var _exhibitions = require("./exhibitions");

function initModels(sequelize) {
  var artefacts = _artefacts(sequelize, DataTypes);
  var artists = _artists(sequelize, DataTypes);
  var exhibitions = _exhibitions(sequelize, DataTypes);


  return {
    artefacts,
    artists,
    exhibitions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

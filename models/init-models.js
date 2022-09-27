var DataTypes = require("sequelize").DataTypes;
var _artefacts = require("./artefacts");
var _artists = require("./artists");
var _exhibition_artefacts = require("./exhibition_artefacts");
var _exhibitions = require("./exhibitions");

function initModels(sequelize) {
  var artefacts = _artefacts(sequelize, DataTypes);
  var artists = _artists(sequelize, DataTypes);
  var exhibition_artefacts = _exhibition_artefacts(sequelize, DataTypes);
  var exhibitions = _exhibitions(sequelize, DataTypes);

  exhibition_artefacts.belongsTo(artefacts, { as: "artefact", foreignKey: "artefact_id"});
  artefacts.hasMany(exhibition_artefacts, { as: "exhibition_artefacts", foreignKey: "artefact_id"});
  artefacts.belongsTo(artists, { as: "artist", foreignKey: "artist_id"});
  artists.hasMany(artefacts, { as: "artefacts", foreignKey: "artist_id"});
  exhibition_artefacts.belongsTo(exhibitions, { as: "exhibition", foreignKey: "exhibition_id"});
  exhibitions.hasMany(exhibition_artefacts, { as: "exhibition_artefacts", foreignKey: "exhibition_id"});

  return {
    artefacts,
    artists,
    exhibition_artefacts,
    exhibitions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

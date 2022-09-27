const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exhibition_artefacts', {
    exh_art_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    exhibition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'exhibitions',
        key: 'exhibition_id'
      }
    },
    artefact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artefacts',
        key: 'artefact_id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    }
  }, {
    sequelize,
    tableName: 'exhibition_artefacts',
    timestamps: false,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "exh_art_id" },
        ]
      },
      {
        name: "FK_exhibition_id",
        using: "BTREE",
        fields: [
          { name: "exhibition_id" },
        ]
      },
      {
        name: "FK_artefact_id",
        using: "BTREE",
        fields: [
          { name: "artefact_id" },
        ]
      },
    ]
  });
};

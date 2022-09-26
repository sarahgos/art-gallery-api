const sequelize = require('../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('artefacts', {

    id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true ,
            allowNull: false 
    },
        artist: {
            type: Sequelize.STRING, 
            allowNull: false 
    },
        title: {
            type: Sequelize.STRING, 
            allowNull: false 
    },
        description: {
            type: Sequelize.STRING,  
    },
        type: {
            type: Sequelize.STRING, 
            allowNull: false 
    },
        material: {
            type: Sequelize.STRING, 
            allowNull: false 
    },
        date: {
            type: Sequelize.DATE 
    },
        created_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
    },
        modified_at: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
    },
    },
        { timestamps: false }
    );
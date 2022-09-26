const sequelize = require('../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('exhibitions', {
     
        id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true ,
            allowNull: false 
    },
        title: {
            type: Sequelize.STRING, 
            allowNull: false 
    },
        artists: {
            type: Sequelize.STRING, 
            allowNull: false 
    },
        description: {
            type: Sequelize.STRING, 
            allowNull: false 
    },
        type: {
            type: Sequelize.STRING
    },
        start_date: {
            type: Sequelize.DATE, 
            allowNull: false 
    },
        end_date: {
            type: Sequelize.DATE, 
            allowNull: false 
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
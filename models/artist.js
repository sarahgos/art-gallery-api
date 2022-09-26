const sequelize = require('../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('artists', {
     id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true ,
        allowNull: false 
    },
        first_name: {
        type: Sequelize.STRING, 
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'First name is required'
            }
        }      
    },
        last_name: {
        type: Sequelize.STRING, 
        allowNull: false 
    },
        dob: {
        type: Sequelize.DATE 
    },
        created_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
       // allowNull: false,
    },
        modified_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
       // allowNull: false,
    },
    },
        { timestamps: false }
    );
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    urlImg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date:
    {
        type : DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Event;
 

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Register = sequelize.define('Register', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Register;

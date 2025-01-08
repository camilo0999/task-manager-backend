// models/taskModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    dueDate: {
        type: DataTypes.DATE,
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
    },
    tags: {
        type: DataTypes.STRING,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'tasks',
});

// Definición de la relación
Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = Task;

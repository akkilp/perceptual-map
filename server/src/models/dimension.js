const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

const Map = require('../models/map')

class Dimension extends Model {}

Dimension.init({
    id: {
    type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    valueType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    minValue: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    maxValue: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    mapId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'maps', key: 'id' },
    },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'dimension',
})

module.exports = Dimension
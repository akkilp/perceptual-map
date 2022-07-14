const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

const User = require("./user")
const Dimension = require('./dimension')
const Answer = require('./answer')


class Map extends Model {}

Map.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  creator: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'map',
  defaultScope: {
    attributes: {
      exclude: ['creator']
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username'],
        as: 'createdBy'
      },
      {
        model: Dimension,
        attributes: ['id', 'name', 'valueType', 'minValue', 'maxValue']
      },
      {
        model: Answer,
        attributes: ['user_id', 'dimension_id', 'answer']
      },
    ]
  },
})

module.exports = Map
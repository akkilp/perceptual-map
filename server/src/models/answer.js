const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Answer extends Model {}

Answer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id'}
      },
      mapId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'maps', key: 'id'}
      },
      dimensionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'dimensions', key: 'id'}
      },
      answer: {
        type: DataTypes.STRING, // The value is conditionally changed to proper type in server side
        allowNull: false,
      },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'answers',
})

module.exports = Answer
const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('answers', {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id'}
          },
          map_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'maps', key: 'id'}
          },
          dimension_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'dimensions', key: 'id'}
          },
          answer: {
            type: DataTypes.STRING, // The value is conditionally changed to proper type in server side
            allowNull: false,
          },
      })    
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('answers')
  },
}
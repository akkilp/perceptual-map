const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('dimensions', {
      id: {
          type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          value_type: {
            type: DataTypes.STRING,
            allowNull: false
          },
          min_value: {
            type: DataTypes.FLOAT,
            allowNull: true
          },
          max_value: {
            type: DataTypes.FLOAT,
            allowNull: true
          },
      },),    
      await queryInterface.addColumn('dimensions', 'map_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'maps', key: 'id'}
      })
  },
  
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('dimensions')
  },
}
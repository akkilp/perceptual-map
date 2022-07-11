const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('maps', {
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
        created_at: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false
        },
    },),
    await queryInterface.addColumn('maps', 'creator', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id'}
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('maps')
  },
}
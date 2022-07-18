const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn(
      "users",
      "admin",
      {
        type: DataTypes.BOOLEAN,
        default: false,
      },
      {
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "admin");
  },
};

const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("subjects", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING, // The value is conditionally changed to proper type in server side
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      map_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "maps", key: "id" },
      },
    }),
      await queryInterface.addColumn("answers", "subject_id", {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "subjects", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("answers", "subject_id");
    await queryInterface.dropTable("subjects");
  },
};

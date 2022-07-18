const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Subject extends Model {}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, // The value is conditionally changed to proper type in server side
      allowNull: false,
    },
    map_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "maps", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "subject",
  }
);

module.exports = Subject;

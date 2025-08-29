const sequalize = require("../config/db");
const { DataTypes } = require("sequelize");

const Status = sequalize.define(
  "status",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Status;

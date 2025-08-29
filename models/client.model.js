const sequalize = require("../config/db");
const { DataTypes } = require("sequelize");

const Client = sequalize.define(
  "client",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING(50), allowNull: false },
    phone_number: {
      type: DataTypes.STRING(50),
      unique: true,
      validate: { is: /^\d{2}-\d{3}-\d{2}-\d{2}/ },
    },
    email: { type: DataTypes.STRING(30) },
    address: { type: DataTypes.STRING(50) },
    location: { type: DataTypes.STRING(30) },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Client;

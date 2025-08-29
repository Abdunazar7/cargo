const sequalize = require("../config/db");
const { DataTypes } = require("sequelize");

const CurrencyType = sequalize.define(
  "currency_type",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.TEXT },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = CurrencyType;

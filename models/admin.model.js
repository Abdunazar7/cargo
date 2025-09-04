const sequalize = require("../config/db");
const { DataTypes } = require("sequelize");

const Admin = sequalize.define(
  "admin",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING(50), allowNull: false },
    user_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    confirm_password: { type: DataTypes.STRING(100), allowNull: false },
    phone_number: { type: DataTypes.STRING(30) },
    email: { type: DataTypes.STRING(50) },
    tg_link: { type: DataTypes.STRING(100) },
    token: { type: DataTypes.STRING(200) },
    is_creator: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    description: { type: DataTypes.TEXT },
    refresh_token: {
      type: DataTypes.TEXT,
    }
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Admin;

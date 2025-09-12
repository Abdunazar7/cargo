// models/otp.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// OTP jadvali
const Otp = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.UUID,          // UUID turi
      defaultValue: DataTypes.UUIDV4, // Avto-generatsiya (v4)
      primaryKey: true,
    },
    otp: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    expiration_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "otp",
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = Otp;

const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Admin = require("./admin.model");
const Order = require("./order.model");
const Status = require("./status.model");

const Operation = sequelize.define(
  "operation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    operation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
    },
  },
  { freezeTableName: true, timestamps: false }
);

Admin.belongsToMany(Order, { through: Operation });
Order.belongsToMany(Admin, { through: Operation });

Status.hasMany(Operation);
Operation.belongsTo(Status);

module.exports = Operation;

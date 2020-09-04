const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    createdat: {
      type: DataTypes.DATE,
    },
    updatedat: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
    updatedAt: "updatedat",
    createdAt: "createdat",
  }
);

User.associate = (models) => {
  User.hasMany(models.Photo, {
    onDelete: "cascade",
  });
};
module.exports = User;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Photo = sequelize.define(
  "Photo",
  {
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "photos",
  }
);

Photo.associate = (models) => {
  Photo.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
    },
  });
};
module.exports = Photo;

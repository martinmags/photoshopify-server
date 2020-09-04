require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "postgres",
  host: process.env.DB_HOST,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const test = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
};
test();

module.exports = sequelize;

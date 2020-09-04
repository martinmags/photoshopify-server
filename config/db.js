const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("photoshopify", "postgres", "pinto1248", {
  dialect: "postgres",
  host: "localhost",
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

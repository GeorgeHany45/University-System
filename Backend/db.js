const { Sequelize } = require("sequelize");

// SQLite database file (it will be created automatically)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "SchoolDB.sqlite", // database file
  logging: false, // optional, to hide SQL logs
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("SQLite connected successfully");
  } catch (err) {
    console.error("Unable to connect to SQLite:", err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

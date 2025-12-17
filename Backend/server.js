const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./db");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

const PORT = 5000;

const startServer = async () => {
  await connectDB();

  // Sync models (create tables if they don't exist)
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

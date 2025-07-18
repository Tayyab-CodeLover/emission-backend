require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

//import routes
const mapData = require("./routes/mapDataRoute");
const auth = require("./routes/authRoutes");

const app = express();

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//routes use in app
app.use("/", mapData);
app.use("/", auth);

const port = process.env.PORT;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected Successfylly");

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error("Unable to connected to the Database", error);
  }
};

startServer();

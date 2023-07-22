const express = require("express");
require('dotenv').config();
const connection = require("./db");
const app = express();

const cors = require("cors");

const { appointmentRouter } = require("./routes/appointment.route");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/appointment", appointmentRouter);


app.listen(3005, async () => {
  try {
    await connection;
    console.log("backend connected");
  } catch (error) {
    console.log(error.message);
  }

  console.log(`server running at port ${process.env.PORT}`);
});

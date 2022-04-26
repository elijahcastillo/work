const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const dashboardRouter = require("./routes/dashboard");

//--------middleware----------
app.use(cors());
app.use(express.json()); //req.body

//----------ROUTES-----------

//reqister and login routes
app.use("/auth", authRouter);

//dashboard route
app.use("/dashboard", dashboardRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

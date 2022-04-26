const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //get token
    const jwtToken = req.header("token");

    //check if it exists
    if (!jwtToken) {
      return res.status(403).json("Unathorized");
    }

    //check if token is valid
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    //set the req so that it can be used in the routes
    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json("Unathorized");
  }
};

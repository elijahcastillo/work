const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    //get the user_id payload from the req sent by the authorization middleware
    //query database for the user data from the id
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    //send the user data to the client
    return res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Error");
  }
});

module.exports = router;

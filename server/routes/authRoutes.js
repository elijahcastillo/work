const express = require("express");
const router = express.Router();

//db
const pool = require("../db");

//security
const bcrypt = require("bcrypt");
const jwtGen = require("../utils/jwtGenerator");

//middleware
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, async (req, res) => {
  try {
    //1.destructure req body
    const { name, email, password } = req.body;

    //2.check if user exists (if user exists throw err)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists");
    }

    //3.encrypt user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4.insert user into database
    const newUser = await pool.query(
      "INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING user_id, user_name, user_email ",
      [name, email, bcryptPassword]
    );
    console.log(newUser, "NEWWWWW");

    //5.generate jwt
    const token = jwtGen(newUser.rows[0].user_id);

    //send data back to client
    const db_name = newUser.rows[0].user_name;
    const db_email = newUser.rows[0].user_email;

    return res.json({ token: token, user: { name: db_name, email: db_email } });
  } catch (error) {
    console.log(error, "COOL");
    return res.status(500).json("Server Error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure req body
    const { email, password } = req.body;

    //2. check if user dosent exist (if not throw err)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is Incorrect");
    }

    //check if password is equal to databse password
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!isValidPassword) {
      return res.status(401).json("Password or Email is Incorrect");
    }

    //send jwt token
    const token = jwtGen(user.rows[0].user_id);

    const db_name = user.rows[0].user_name;
    const db_email = user.rows[0].user_email;

    return res.json({ token: token, user: { name: db_name, email: db_email } });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server Error");
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    //because the route passed the authorization middleware we know that the token is good
    return res.json(true);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Error");
  }
});

module.exports = router;

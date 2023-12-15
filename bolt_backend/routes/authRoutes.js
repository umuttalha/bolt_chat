const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../database.js");

const secretKey = process.env.SECRET_KEY;
const saltRounds = 10;

router.post("/register", (req, res) => {



  try {
    const { username,email, password } = req.body;

    console.log(username)

    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters long" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 5 characters long" });
    }

    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "An error asdasdasdasdasdasd while registering" });
        }

        console.log("user")
        console.log(user)


        if (user) {
          return res.status(409).json({ error: "Username already exists" });
        }

        let generatedSalt;

        bcrypt
          .genSalt(saltRounds)
          .then((salt) => {
            generatedSalt = salt;
            return bcrypt.hash(password, salt);
          })
          .then((hash) => {
            db.run(
              "INSERT INTO users (username,email, password, salt) VALUES (?,?, ?, ?)",
              [username, email,hash, generatedSalt],
              (err) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ error: "An error occurred while registering" });
                }

                const userId = this.lastID;
                console.log("deneme")
                console.log(userId);
            
                const token = jwt.sign(
                  { username: username, id: userId },
                  secretKey,
                  {
                    expiresIn: "2w",
                  }
                );
            
                res.status(201).json({
                  message: "User registered successfully. You can login now",
                  token: token,
                  username: username,
                });
              }
            );
          })
          .catch((err) => {
            console.error(err);
            res
              .status(500)
              .json({ error: "An error occurred while registering" });
          });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while registering" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "An error occurred while logging in" });
        }

        if (!user) {
          return res
            .status(404)
            .json({
              error:
                "Username or password invalid. I am not gonna say which one",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res
            .status(401)
            .json({
              error:
                "Username or password invalid. I am not gonna say which one",
            });
        }

        const token = jwt.sign(
          { username: user.username, id: user.id },
          secretKey,
          {
            expiresIn: "2w",
          }
        );

        const message = "Successfully logged in";

        res.status(200).json({ message, token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;

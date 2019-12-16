const db = require("./apiHelper.js");
const bcjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.post("/register", (req, res) => {
  const creds = req.body;

  const hash = bcjs.hashSync(creds.password, 8);
  creds.password = hash;

  db.addUser(creds)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error adding a new user to the database" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.findBy({ username })
    .then(user => {
      if (user && bcjs.compareSync(password, user.password)) {
        let token = generateToken(user);
        res
          .status(200)
          .json({
            message: `Welcome ${username}! Here's a token: `,
            token: token
          });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error logging in" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1hr"
  };

  return jwt.sign(payload, "whatAboutSecondBreakfast?", options);
}

module.exports = router;
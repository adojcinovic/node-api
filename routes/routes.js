const express = require("express");
const jwt = require("jsonwebtoken");
let router = express.Router();
router.use(express.json());

router.get("/", verifyToken, (request, response) => {
  jwt.verify(request.token, "secretKey", (error, userData) => {
    if (error) {
      response.status(403).send("Your session expired");
    } else {
      response.json({
        message: "Logged in",
        userData,
      });
    }
  });
});

router.post("/", (request, response) => {
  const user = request.body;

  jwt.sign(
    { user: user },
    "secretKey",
    { expiresIn: "60s" },
    (error, token) => {
      response.json({ token: token });
    }
  );
});

function verifyToken(request, response, next) {
  const bearerHeader = request.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    request.token = token;
    next();
  } else {
    response.status(403).send("Access not granted, please log in.");
  }
}

module.exports = router;

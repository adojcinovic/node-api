const express = require("express");
const router = express.Router();
const upload = require("../multer/multer");

router.post("/", upload.single("photo"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  if (req.file) {
    res.json(req.file);
  } else {
    res.status(500).send("failure to uplaod image");
  }
});

module.exports = router;

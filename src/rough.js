const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");

router.get("/", async (req, res) => {
  try {
    let userResponse = await User.find({});

    res.status(200).send({
      message: "suggestions",
      suggestions: userResponse.slice(0, 4),
    });
  } catch (error) {
    console.log("error ->", error);
    res.status(500).send({ message: "Cann't load suggestions " });
  }
});

module.exports = router;

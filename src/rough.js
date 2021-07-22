const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const { extend } = require("lodash");
var jwt = require("jsonwebtoken");
const mySecret = process.env["secret"];
const { cloudinary } = require("../cloudinary");

router.post("/", async (req, res) => {
  const userId = req.userId;
  const { update } = req.body;
  console.log({ update });
  try {
    let userResponse = await User.findById(userId);

    if (userResponse.coverImage != update.coverImage) {
      const { url } = await cloudinary.uploader.upload(update.coverImage);
      update.coverImage = url;
    }

    if (userResponse.profileImage != update.profileImage) {
      const { url } = await cloudinary.uploader.upload(update.profileImage);
      update.profileImage = url;
    }

    userResponse = extend(userResponse, update);

    userResponse = await userResponse.save();
    var token = await jwt.sign(
      {
        userId: userResponse._id,
        userName: userResponse.userName,
        profileImage: userResponse.profileImage,
      },
      mySecret
    );
    userResponse.password = undefined;
    console.log("userResponse ->", userResponse);
    res.status(200).send({
      message: "info Updated successFully",
      userDetails: userResponse,
      token,
    });
  } catch (error) {
    console.log("error ->", error);
    if (error.name === "MongoError" && error.code === 11000) {
      res.status(500).send({ message: "Email Id already exist " });
    } else {
      res
        .status(500)
        .send({ message: "error occured Cann't update right now" });
    }
  }
});

module.exports = router;

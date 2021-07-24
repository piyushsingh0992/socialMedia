const express = require("express");
const router = express.Router();
const Post = require("../models/post.model.js");
const Notification = require("../models/notification.model.js");

router.post("/:postId", async (req, res) => {
  let { postId } = req.params;

  let userId = req.userId;
  let userName = req.userName;
  let userImage = req.profileImage;
  const { text } = req.body;

  try {
    let postResponse = await Post.findById(postId);

    postResponse.comments.unshift({
      userId,
      userName,
      userImage,
      text,
    });

    postResponse = await postResponse.save();
    postResponse = await Post.findById(postResponse._id).populate("user");

    console.log("userId ->", userId);
    console.log("postResponse.userId ->", postResponse.userId);
    console.log(
      "userId != postResponse.userId ->",
      userId != postResponse.userId
    );
    if (userId != postResponse.userId) {
      let notificationResponse = await Notification.findOne({
        userId: postResponse.user,
      });
      notificationResponse.notifications.unshift({
        userId,
        post: postId,
        userName,
        notificationType: "COMMENT",
      });

      notificationResponse = await notificationResponse.save();
    }

    res.status(200).send({ message: "comment published", post: postResponse });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured Cann't publish your Comment right Now" });
  }
});

router.delete("/:postId/:commentId", async (req, res) => {
  let { postId, commentId } = req.params;

  try {
    let postResponse = await Post.findById(postId);
    postResponse.comments = postResponse.comments.filter(
      (item) => item._id != commentId
    );
    postResponse = await postResponse.save();
    res.status(200).send({ message: "comment Removed", post: postResponse });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured Cann't delete your Comment right Now" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Post = require("../models/post.model.js");
const User = require("../models/user.model.js");
const { cloudinary } = require("../cloudinary");

router.get("/:userId/all", async (req, res) => {
  const { userId } = req.params;
  try {
    let postArray = await Post.find({ user: userId }).populate("user");

    res.status(200).send({ message: "Your all posts", posts: postArray });
  } catch (error) {
    res.status(500).send({ message: "Error Occured" });
  }
});

router.get("/", async (req, res) => {
  const userId = req.userId;
  try {
    let postResponse = await Post.find({}).populate("user");

    postResponse = postResponse.filter((item) => {
      return item.user._id != userId;
    });

    res.status(200).send({ message: "News feed loaded", posts: postResponse });
  } catch (error) {
    res.status(500).send({ message: "Error Occured" });
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    let postResponse = await Post.findById(postId);

    postResponse = await Post.findById(postResponse._id).populate({
      path: "user",
      model: "user",
      populate: { path: "comments.userId", model: "user" },
    });
    console.log(postResponse);
    res.status(200).send({ message: "desired post", post: postResponse });
  } catch (error) {
    res.status(500).send({ message: "Error Occured" });
  }
});

router.post("/:userId/create", async (req, res) => {
  const { userId } = req.params;
  const { postDetails } = req.body;

  try {
    let userResponse = await User.findById(userId);

    const { url, public_id } = await cloudinary.uploader.upload(
      postDetails.img
    );

    let newPost = new Post({
      user: userId,
      img: { url, public_id },
      caption: postDetails.caption,
    });

    newPost = await newPost.save();

    newPost = await Post.findById(newPost._id).populate("user");
    userResponse.posts.unshift(newPost._id);
    userResponse = await userResponse.save();

    res.status(200).send({
      message: "post created",
      post: newPost,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured cann't create your post right now" });
  }
});

router.delete("/:postId", async (req, res) => {
  const { postId } = req.params;
  const userId = req.userId;

  try {
    let postResponse = await Post.findById(postId);

    postResponse = await postResponse.remove();

    let userResponse = await User.findById(userId);
    userResponse.posts = userResponse.posts.filter((item) => item != postId);

    userResponse = await userResponse.save();

    res.status(200).send({
      message: "post Deleted",

      deletedPostId: postId,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Occured Cann't delete your Post right now" });
  }
});

module.exports = router;

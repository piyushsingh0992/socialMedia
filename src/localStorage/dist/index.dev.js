"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfoLocal = getUserInfoLocal;
exports.logInLocal = logInLocal;
exports.logOutLocal = logOutLocal;
exports.addFollowingLocal = addFollowingLocal;
exports.removeFollowingLocal = removeFollowingLocal;
exports.addPostLocal = addPostLocal;
exports.removePostLocal = removePostLocal;

function getUserInfoLocal() {}

function logInLocal(userDetails) {
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

function logOutLocal() {
  localStorage.removeItem("userDetails");
}

function addFollowingLocal(followerId) {
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.userDetails.following.push(followerId);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

function removeFollowingLocal(followerId) {
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.userDetails.following = userDetails.userDetails.following.filter(function (item) {
    return item != followerId;
  });
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

function addPostLocal(postId) {
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.userDetails.posts.push(postId);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

function removePostLocal(postId) {
  var userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.userDetails.posts = userDetails.userDetails.posts.filter(function (item) {
    return item != postId;
  });
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}
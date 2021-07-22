export function getUserInfoLocal() {}

export function logInLocal(userDetails) {
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

export function logOutLocal() {
  localStorage.removeItem("userDetails");
}

export function addFollowingLocal(followerId) {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.userDetails.following.push(followerId);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

export function removeFollowingLocal(followerId) {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.userDetails.following = userDetails.userDetails.following.filter(
    (item) => item != followerId
  );
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

export function addPostLocal(postId) {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.userDetails.posts.push(postId);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

export function removePostLocal(postId) {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  userDetails.userDetails.posts = userDetails.userDetails.posts.filter(
    (item) => item != postId
  );
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

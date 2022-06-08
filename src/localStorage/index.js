export function getUserInfoLocal() {}

export function logInLocal(userDetails) {
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

export function logOutLocal() {
  localStorage.removeItem("userDetails");
}

export function getLastRoute() {
  return localStorage.getItem("lastRoute");
}

export function setLastRoute(path) {
  localStorage.setItem("lastRoute", path);
}
export function clearLastRoute() {
  localStorage.removeItem("lastRoute");
}

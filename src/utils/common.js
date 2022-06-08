import axios from "axios";

export const setupAuthHeader = (token) => {
  if (token) {
    return (axios.defaults.headers.common["auth"] = token);
  }
  delete axios.defaults.headers.common["auth"];
};

export const setupAuthExceptionHandler = (logout, navigate) => {
  const UNAUTHORIZED = 401;
  const PAGE_NOT_FOUND = 404;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logout();
        navigate("login");
      }

      if (error?.response?.status === PAGE_NOT_FOUND) {
        navigate("PAGE NOT FOUND");
      }
      return Promise.reject(error);
    }
  );
};

export function getNewPath(path, paramsArray) {
  let pathArray = path.split(":");
  let newArray = pathArray.map((item) => {
    if (paramsArray[item]) {
      return paramsArray[item];
    }
    return item;
  });
  return newArray.join("");
}

export const randomize = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
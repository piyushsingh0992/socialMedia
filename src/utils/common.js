import axios from "axios";

export const setupAuthHeader = (token) => {
  if (token) {
    return (axios.defaults.headers.common["auth"] = token);
  }
  delete axios.defaults.headers.common["auth"];
};

export const setupAuthExceptionHandler = (logout, navigate, dispatch) => {
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

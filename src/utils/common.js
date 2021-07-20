import axios from "axios";

export const setupAuthHeader = (token) => {
  if (token) {
    return (axios.defaults.headers.common["auth"] = token);
  }
  delete axios.defaults.headers.common["auth"];
};

export const setupAuthExceptionHandler = (logout, navigate, dispatch) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        dispatch(logout());
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
};

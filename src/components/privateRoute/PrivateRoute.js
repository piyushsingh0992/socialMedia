import React from "react";
import { useParams, Navigate, Route } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/authContext.js";

function getNewPath(path, paramsArray) {
  let pathArray = path.split(":");
  let newArray = pathArray.map((item) => {
    if (paramsArray[item]) {
      return paramsArray[item];
    }
    return item;
  });
  return newArray.join("");
}

const PrivateRoute = ({ path, ...props }) => {
  const {
    login: { loginStatus },
  } = useAuth();

  let paramsArray = useParams();

  let newPath = getNewPath(path, paramsArray);

  return loginStatus ? (
    <Route to={path} {...props} />
  ) : (
    <Navigate state={{ from: newPath }} replace to="/login" />
  );
};

export default PrivateRoute;

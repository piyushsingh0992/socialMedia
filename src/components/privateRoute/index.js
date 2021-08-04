import React from "react";
import { useParams, Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {getNewPath} from "../../utils/common"

const PrivateRoute = ({ path, ...props }) => {
  const token = useSelector((state) => state.auth.token);

  let paramsArray = useParams();

  let newPath = getNewPath(path, paramsArray);
  return token ? (
    <Route to={path} {...props} />
  ) : (
    <Navigate state={{ from: newPath }} replace to="/login" />
  );
};

export default PrivateRoute;

import React, { useState, useEffect } from "react";
import "./style.css";
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  setupAuthHeader,
  setupAuthExceptionHandler,
} from "../../utils/common.js";
import {  useDispatch, } from "react-redux";

import {
  resetUserSlice,
} from "./userSlice";
export default function LoginContainer() {
  const [currentUser, currentUserSetter] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useSelector((state) => state.auth);
  const dispatch=useDispatch();

  useEffect(() => {
    if (user.token) {
      setupAuthHeader(user.token);
      setupAuthExceptionHandler(resetUserSlice, navigate, dispatch);
      navigate(state && state.from ? state.from : "/");
    }
  }, [user]);

  const [signInDetails, signInDetailsSetter] = useState({
    password: "",
    email: "",
  });

  const [signUpDetails, signUpDetailsSetter] = useState({
    userName: "",
    password: "",
    email: "",
    pronouns: "",
    sex: "",
  });

  return (
    <div className="main-container login-screen">
      {currentUser ? (
        <SignIn
          currentUserSetter={currentUserSetter}
          signInDetails={signInDetails}
          signInDetailsSetter={signInDetailsSetter}
        />
      ) : (
        <SignUp
          currentUserSetter={currentUserSetter}
          signUpDetails={signUpDetails}
          signUpDetailsSetter={signUpDetailsSetter}
          signInDetailsSetter={signInDetailsSetter}
        />
      )}
    </div>
  );
}

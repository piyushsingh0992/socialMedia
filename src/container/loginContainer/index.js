import React, { useState, useEffect } from "react";
import "./style.css";
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
export default function LoginContainer() {
  const [currentUser, currentUserSetter] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    debugger;
    if (user.status === "fullfilled") {
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

import React, { useState, useEffect } from "react";
import "./style.css";
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";

export default function LoginContainer() {
  const [currentUser, currentUserSetter] = useState(false);
  const [signInDetails, signInDetailsSetter] = useState({
    password: "",
    email: "",
  });

  const [signUpDetails, signUpDetailsSetter] = useState({
    userName: "",
    password: "",
    email: "",
    pronouns: "",
    sex: null,
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

import React, { useState, useEffect } from "react";
import "./style.css";
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";

export default function LoginScreen() {
  const [currentUser, currentUserSetter] = useState(false);

  return (
    <div className="screen-container login-screen">
      {currentUser ? <SignIn currentUserSetter={currentUserSetter}/> : <SignUp currentUserSetter={currentUserSetter} />}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";

export default function LoginScreen() {
  const [currentUser, currentUserSetter] = useState(true);

  return (
    <div className="screen-container">
      {currentUser ? <SignIn /> : <SignUp />}
  
    </div>
  );
}

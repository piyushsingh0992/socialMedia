import React, { useState, useEffect } from "react";

import SignIn from "../../components/signIn";
import SignUp from "../../components/signUp";

export default function LoginScreen() {
  const [currentUser, currentUserSetter] = useState(false);

  return (
    <div className="screen-container" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
     
      {currentUser ? <SignIn /> : <SignUp />}
     
    </div>
  );
}

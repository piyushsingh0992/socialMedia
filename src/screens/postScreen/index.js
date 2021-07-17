import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function PostScreen() {
  return (
    <div className="screen-container">
      <Navbar />
      <h1>postscreen</h1>
      <Footer />
    </div>
  );
}

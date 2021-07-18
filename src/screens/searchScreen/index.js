import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import SearchResult from "../../components/searchResult";
import Container from "@material-ui/core/Container";
export default function SearchScreen() {
  return (
    <div className="screen-container">
      <Navbar />
      <Container maxWidth="sm">
        <h3>SearchScreen</h3>
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
        <SearchResult />
      </Container>
    </div>
  );
}

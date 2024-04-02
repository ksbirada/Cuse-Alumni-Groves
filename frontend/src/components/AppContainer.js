import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import FeedPage from "./feed";
import SignUp from "./signup";
import Login from "./Login";

function AppContainer() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newsfeed" element={<FeedPage/>} />  
      </Routes>
    </HashRouter>
  );
}

export default AppContainer;

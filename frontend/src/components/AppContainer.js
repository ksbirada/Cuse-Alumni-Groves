import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import FeedPage from "./feed";
import SignUp from "./signup";

function AppContainer() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />    
        <Route path="/newsfeed" element={<FeedPage/>} />   
      </Routes>
    </HashRouter>
  );
}

export default AppContainer;

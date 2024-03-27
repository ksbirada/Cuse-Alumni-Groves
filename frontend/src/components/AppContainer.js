import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";

import SignUp from "./signup";

function AppContainer() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />       
      </Routes>
    </HashRouter>
  );
}

export default AppContainer;

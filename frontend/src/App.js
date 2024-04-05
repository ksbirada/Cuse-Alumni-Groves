import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/signup'
import NewsFeed from './components/NewsFeed';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newsfeed" element={<NewsFeed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

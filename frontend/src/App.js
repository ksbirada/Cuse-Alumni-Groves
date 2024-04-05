import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/signup'
import NewsFeed from './components/NewsFeed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/newsfeed" element={<NewsFeed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

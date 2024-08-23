import React  from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from "./components/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"

import Home from "./pages/home/Home";
 // Ensure this path is correct

function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
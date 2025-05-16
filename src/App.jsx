import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage  from './pages/LandingPage';
import LoginPage    from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage     from './pages/MainPage';

function App() {
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />}  />
      <Route path="/login"    element={<LoginPage />}    />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/spolki"   element={<MainPage />}      />
    </Routes>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage    from './pages/LandingPage.jsx';
import LoginPage      from './pages/LoginPage.jsx';
import RegisterPage   from './pages/RegisterPage.jsx';
import MainPage       from './pages/MainPage.jsx';
import OneCompanyPage from './pages/OneCompanyPage.jsx';
import Predictions    from './pages/Predictions.jsx';
import ProfilePage    from './pages/ProfilePage.jsx';
import ContactPage    from './pages/ContactPage.jsx';
import PrivateRoute   from './components/PrivateRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/kontakt"  element={<ContactPage />} />
      <Route path="/profile"  element={<ProfilePage />} />

      <Route
        path="/predykcje"
        element={
          <PrivateRoute>
            <Predictions />
          </PrivateRoute>
        }
      />

      <Route
        path="/spolki"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/spolki/:id"
        element={
          <PrivateRoute>
            <OneCompanyPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

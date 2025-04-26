import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompanyTable from "./components/CompanyTable";
import "./Landing.css";

function CompanyTablePage() {
  return (
    <div className="spolki-page">
      <h1 className="spolki-title">Akcje na Giełdzie</h1>
      <CompanyTable />
      <footer className="spolki-footer">
        © {new Date().getFullYear()} Aplikacja Giełdowa
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/spolki" element={<CompanyTablePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;

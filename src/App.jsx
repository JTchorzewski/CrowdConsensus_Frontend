import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CompanyTable from "./components/CompanyTable";
import "./Landing.css"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/spolki" element={<CompanyTablePage />} />
      </Routes>
    </Router>
  );
}


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

export default App;

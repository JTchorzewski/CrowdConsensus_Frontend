import logo from "../assets/logo.png";
import React from 'react';
import RegisterForm from "../components/RegisterForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "../LoginRegister.css";

function RegisterPage() {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow-sm p-4 rounded-4 w-100" style={{ maxWidth: '500px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold text-primary m-0">Zarejestruj się</h2>
          <img src={logo} alt="Consensus Logo" className="logo" />
        </div>
        <RegisterForm />
      </div>
      <footer className="mt-4 text-center text-muted small w-100" style={{ maxWidth: '500px' }}>
        <nav className="mb-2">
          <a href="#" className="text-decoration-none mx-2 fw-semibold text-secondary">Regulamin</a>
          <a href="#" className="text-decoration-none mx-2 fw-semibold text-secondary">Polityka Prywatności</a>
        </nav>
        <p>© Consensus 2025 - Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

export default RegisterPage;
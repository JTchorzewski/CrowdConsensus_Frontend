import logo from "../assets/logo.png";
import React from 'react';
import LoginForm from "../components/LoginForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "../LoginRegister.css";

function App() {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <main className="w-100" style={{ maxWidth: '500px' }}>
        <LoginForm />
      </main>
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

export default App;

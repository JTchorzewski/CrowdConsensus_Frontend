import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import logo from "../assets/logo.png";

function LoginForm() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginUser(credential, password);
      console.log('Login successful:', result);

      localStorage.setItem('token', result.token);

      alert('Logowanie udane!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (typeof err === 'string') {
        setError(err);
      } else {
        setError(err.message || 'Wystąpił błąd podczas logowania');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 fw-bold text-primary m-0">Zaloguj się</h1>
        <img src={logo} alt="Crowd Consensus Logo" className="logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <label htmlFor="emailOrUsername" className="form-label fw-semibold">E-mail / Nazwa użytkownika</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="emailOrUsername"
            placeholder="E-mail lub nazwa użytkownika"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label fw-semibold">Hasło</label>
          <input
            type="password"
            className="form-control rounded-3"
            id="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        {error && <div className="alert alert-danger rounded-3 text-center small">{error}</div>}
        <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold" disabled={isLoading}>
          {isLoading ? 'Logowanie...' : 'Dalej'}
        </button>
      </form>

      <div className="text-center">
        <Link to="/register" className="d-block mt-4 text-decoration-underline fw-semibold text-secondary small">
          Utwórz konto
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
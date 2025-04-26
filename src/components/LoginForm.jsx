import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

function LoginForm() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const loginData = { credential, password };
    const backendUrl = '/api/login';

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        alert('Logowanie udane!');
      } else {
        let errorMsg = 'Wystąpił błąd logowania.';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || `Błąd: ${response.status} ${response.statusText}`;
        } catch {
          errorMsg = `Błąd: ${response.status} ${response.statusText}`;
        }
        setError(errorMsg);
      }
    } catch (error) {
      console.error('Network or Fetch Error:', error);
      setError('Nie można połączyć się z serwerem. Spróbuj ponownie później.');
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
          <label htmlFor="emailOrPhone" className="form-label fw-semibold">E-mail/Numer tel.</label>
          <input
            type="text"
            className="form-control rounded-3"
            id="emailOrPhone"
            placeholder="E-mail/Numer tel."
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

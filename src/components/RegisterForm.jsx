import React, { useState } from 'react';
import { registerUser } from '../services/api';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Hasła muszą być takie same.');
      setIsLoading(false);
      return;
    }

    try {
      await registerUser(formData.username, formData.password);
      alert('Rejestracja udana!');
      // Możesz tutaj np. wyczyścić formularz lub przekierować na login
      setFormData({
        username: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error(err);
      if (typeof err === 'string') {
        setError(err);
      } else {
        setError(err.message || 'Wystąpił błąd podczas rejestracji');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 text-start">
        <label htmlFor="username" className="form-label fw-semibold">Nazwa użytkownika (Email)</label>
        <input
          type="text"
          className="form-control rounded-3"
          id="username"
          name="username"
          placeholder="Nazwa użytkownika"
          value={formData.username}
          onChange={handleChange}
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
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-3 text-start">
        <label htmlFor="confirmPassword" className="form-label fw-semibold">Potwierdź hasło</label>
        <input
          type="password"
          className="form-control rounded-3"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Potwierdź hasło"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      {error && <div className="alert alert-danger rounded-3 text-center small">{error}</div>}

      <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold" disabled={isLoading}>
        {isLoading ? 'Rejestrowanie...' : 'Zarejestruj się'}
      </button>
    </form>
  );
}

export default RegisterForm;
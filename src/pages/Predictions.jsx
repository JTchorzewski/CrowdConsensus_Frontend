import React, { useState, useEffect } from 'react';
import { Link }                   from 'react-router-dom';
import { Spinner }                from 'react-bootstrap';
import { fetchMyPredictions }     from '../services/api';
import PageShell                  from '../components/PageShell.jsx';
import '../Predictions.css';

export default function Predictions() {
  const [predictions, setPredictions] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchMyPredictions()
      .then(data => {
        if (!isMounted) return;
        setPredictions(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err.message || 'Wystąpił błąd podczas pobierania predykcji.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <PageShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <div className="container d-flex justify-content-center align-items-center" style={{ height: 300 }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <main className="predictions-page container mt-4">
        <h2 className="mb-4">Twoje predykcje</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {!error && predictions.length === 0 && (
          <p className="empty-message">Nie masz jeszcze swoich predykcji.</p>
        )}

        {!error && predictions.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Spółka</th>
                  <th>Twoja predykcja</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {predictions.map(pred => (
                  <tr key={pred.id}>
                    <td>
                      <Link to={`/spolki/${pred.companyId}`}>
                        {pred.companyName}
                      </Link>
                    </td>
                    <td>
                      {typeof pred.estimate === 'number'
                        ? pred.estimate.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })
                        : pred.estimate}
                    </td>
                    <td>
                      {new Date(pred.createdAt).toLocaleDateString('pl-PL', {
                        year: 'numeric', month: '2-digit', day: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </PageShell>
  );
}

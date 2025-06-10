import React, { useState, useEffect } from 'react';
import '../Landing.css';
import '../MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import discord from '../assets/discord.png';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { fetchCompanies, addPrediction } from '../services/api';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

export default function MainPage() {
  const [menuOpen, setMenuOpen]                   = useState(false);
  const [allItems, setAllItems]                   = useState([]);
  const [filteredItems, setFiltered]              = useState([]);
  const [total, setTotal]                         = useState(0);
  const [page, setPage]                           = useState(1);
  const [query, setQuery]                         = useState('');
  const [loading, setLoading]                     = useState(false);
  const navigate                                   = useNavigate();

  // Prediction form state
  const [editingRowId, setEditingRowId]           = useState(null);
  const [predictionDirection, setPredictionDirection] = useState(''); // "up" or "down"
  const [isSubmitting, setIsSubmitting]           = useState(false);
  const [submitError, setSubmitError]             = useState(null);

  const PAGE_SIZE = 10;
  const BIG_PAGE  = 1000;

  // Fetch all companies (for client-side filtering)
  useEffect(() => {
    setLoading(true);
    fetchCompanies({ page: 1, pageSize: BIG_PAGE, q: '' })
      .then(({ items }) => {
        const list = items || [];
        setAllItems(list);
        setFiltered(list);
        setTotal(list.length);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Apply client-side search
  useEffect(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      setFiltered(allItems);
      setTotal(allItems.length);
    } else {
      const f = allItems.filter(c =>
        c.companyName.toLowerCase().includes(term)
      );
      setFiltered(f);
      setTotal(f.length);
    }
    setPage(1);
  }, [query, allItems]);

  const paged = filteredItems.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleSearch = term => setQuery(term);

  const handleOpenPredictionForm = companyId => {
    setEditingRowId(companyId);
    setPredictionDirection('');
    setSubmitError(null);
  };

  const handleCancelPrediction = () => {
    setEditingRowId(null);
  };

  const handleAddPrediction = (e, companyId) => {
    e.preventDefault();
    if (!predictionDirection) {
      setSubmitError('Wybierz, czy pójdzie w górę czy w dół.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    addPrediction({ companyId, direction: predictionDirection })
      .then(() => {
        alert('Twoja predykcja została pomyślnie dodana!');
        setEditingRowId(null);
        navigate('/predykcje');
      })
      .catch(err => {
        console.error(err);
        setSubmitError(err.message || 'Wystąpił błąd. Spróbuj ponownie.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="main-page-wrapper">
      {/* ——— Header ——— */}
      <header className="header border-bottom">
        <div className="container-fluid d-flex align-items-center px-3 px-md-4">
          <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none">
            <img
              src={logo}
              alt="Crowd Consensus"
              className="d-none d-md-block"
              style={{ height: 111, width: 124.44 }}
            />
            <h1 className="h4 m-0 d-md-none text-dark">Crowd Consensus</h1>
          </Link>

          <nav className="d-none d-md-flex ms-4">
            <ul className="nav gap-3">
              <li className="nav-item">
                <Link to="/spolki" className="nav-link text-dark">Firmy</Link>
              </li>
              <li className="nav-item">
                <Link to="/predykcje" className="nav-link text-dark">Predykcje</Link>
              </li>
            </ul>
          </nav>

          <div className="ms-auto d-none d-md-block">
            <Link to="/profile" className="btn btn-primary px-4">Profil</Link>
          </div>

          <div className="d-md-none ms-auto" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <X size={28}/> : <Menu size={28}/> }
          </div>
          {menuOpen && (
            <div className="w-100 d-md-none mt-3 mobile-menu-items">
              <ul className="nav flex-column gap-2">
                <li className="nav-item">
                  <Link to="/spolki" className="nav-link text-dark">Firmy</Link>
                </li>
                <li className="nav-item">
                  <Link to="/predykcje" className="nav-link text-dark">Predykcje</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="btn btn-primary w-100 px-4">Profil</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* ——— Main Section ——— */}
      <main className="container mt-4">
        <section className="bg-white rounded shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap section-header-controls">
            <h3 className="fw-bold main-title me-3 mb-2 mb-sm-0">
              <span className="text-primary">Lista</span> spółek
            </h3>
            <SearchBar onSearch={handleSearch} />
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Spółka</th>
                      <th>Zysk Netto</th>
                      <th>Data Ostatniego Raportu</th>
                      <th>Predykcja %</th>
                      <th>Przewidywanie</th>
                      <th>Twoja Predykcja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map(c => (
                      <tr key={c.id}>
                        <td>
                          <Link to={`/spolki/${c.id}`} className="nav-link text-dark">
                            {c.companyName}
                          </Link>
                        </td>
                        <td>{c.newestNetProfit}</td>
                        <td>{c.newestRaportDate}</td>
                        <td>{c.newestPrediction.toFixed(2)}</td>
                        <td>
                          {Number(c.newestPrediction) > 0
                            ? '📈'
                            : Number(c.newestPrediction) < 0
                              ? '📉'
                              : null}
                        </td>
                        <td>
                          {editingRowId === c.id ? (
                            <form
                              onSubmit={e => handleAddPrediction(e, c.id)}
                              className="d-flex flex-column align-items-start gap-2"
                            >
                              <p className="mb-1">Pójdzie w górę czy w dół?</p>
                              <div className="btn-group mb-2" role="group">
                                <button
                                  type="button"
                                  className={`btn btn-outline-primary btn-sm ${predictionDirection === 'up' ? 'active' : ''}`}
                                  onClick={() => { setPredictionDirection('up'); setSubmitError(null); }}
                                >
                                  🔼 Góra
                                </button>
                                <button
                                  type="button"
                                  className={`btn btn-outline-primary btn-sm ${predictionDirection === 'down' ? 'active' : ''}`}
                                  onClick={() => { setPredictionDirection('down'); setSubmitError(null); }}
                                >
                                  🔽 Dół
                                </button>
                              </div>
                              <div className="d-flex gap-2">
                                <button
                                  type="submit"
                                  className="btn btn-success btn-sm prediction-form-btn" // <-- Add class here
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Zapisuję...' : 'Wyślij'}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm prediction-form-btn" // <-- And here
                                  onClick={handleCancelPrediction}
                                  disabled={isSubmitting}
                                >
                                  Anuluj
                                </button>
                              </div>
                              {submitError && <small className="text-danger mt-1">{submitError}</small>}
                            </form>
                          ) : (
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleOpenPredictionForm(c.id)}
                            >
                              Dodaj swoją predykcję
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {total > PAGE_SIZE && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    current={page}
                    total={total}
                    pageSize={PAGE_SIZE}
                    onChange={setPage}
                  />
                </div>
              )}

              {total === 0 && (
                <p className="text-center no-results mt-4">
                  {query
                    ? `Brak wyników dla „${query}”`
                    : 'Brak spółek do wyświetlenia. Wyszukaj lub odśwież.'}
                </p>
              )}
            </>
          )}
        </section>
      </main>

      {/* ——— Footer ——— */}
      <div id="footer" className="bg-light">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>Społeczność</h3>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="discord-wrapper d-flex align-items-center gap-2 text-dark text-decoration-none"
              >
                <img src={discord} alt="Discord" style={{ width: 24, height: 24 }} />
                Discord
              </a>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>O nas</h3>
              <div className="d-flex flex-column">
                <Link to="/o-nas#about" className="text-dark text-decoration-none">O nas</Link>
                <Link to="/kariera" className="text-dark text-decoration-none">Kariera</Link>
                <Link to="/warunki-korzystania" className="text-dark text-decoration-none">Warunki korzystania</Link>
                <Link to="/polityka-prywatnosci" className="text-dark text-decoration-none">Polityka prywatności</Link>
                <Link to="/do-pobrania" className="text-dark text-decoration-none">Do pobrania</Link>
                <Link to="/kontakt" className="text-dark text-decoration-none">Kontakt</Link>
              </div>
            </div>
            <div className="col-md-4">
              <h3>Produkty</h3>
              <div className="d-flex flex-column">
                <Link to="/informacje-gieldowe" className="text-dark text-decoration-none">Informacje giełdowe</Link>
                <Link to="/predykcje-gieldowe" className="text-dark text-decoration-none">Predykcje giełdowe</Link>
                <Link to="/research" className="text-dark text-decoration-none">Research</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center py-4 small text-muted">
          <p className="mb-0">© CrowdConsensus 2025 – Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import '../Landing.css'; // Assuming styles from Landing.css are still relevant
import '../MainPage.css'; // Specific styles for MainPage
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png'; // Make sure path is correct
import discord from '../assets/discord.png'; // Make sure path is correct
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { fetchCompanies } from '../services/api'; // Make sure path is correct
import Pagination from '../components/Pagination'; // Make sure path is correct

export default function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [items, setItems]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);
  const [query, setQuery]       = useState('');
  const [loading, setLoading]   = useState(false);
  const PAGE_SIZE = 10;

  useEffect(() => {
    setLoading(true);
    fetchCompanies({ page, pageSize: PAGE_SIZE, q: query })
      .then(({ totalCount, items }) => {
        setItems(items || []);
        setTotal(totalCount || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, query]);

  const onSearch = e => {
    e.preventDefault();
    const searchInput = e.target.elements.search;
    setQuery(searchInput ? searchInput.value.trim() : '');
  };

  return (
    <div className="main-page-wrapper">
      {/* ——— Header ——— */}
      <header className="header border-bottom">
        <div className="container-fluid d-flex align-items-center px-3 px-md-4">
          {/* logo & mobile title */}
          <div className="d-flex align-items-center gap-3">
            <img
              src={logo}
              alt="Crowd Consensus"
              className="d-none d-md-block"
              style={{ height: 111, width: 124.44 }}
            />
            <h1 className="h4 m-0 d-md-none">Crowd Consensus</h1>
          </div>

          {/* nav (desktop) */}
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
          {/* profile button (desktop) */}
          <div className="ms-auto d-none d-md-block">
            <Link to="/profile" className="btn btn-primary px-4">Profil</Link>
          </div>

          {/* mobile menu toggle */}
          <div className="d-md-none ms-auto" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28}/> : <Menu size={28}/>}
          </div>

          {/* mobile menu items */}
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
            <form 
              className="search-form d-flex" 
              onSubmit={onSearch} 
              style={{ maxWidth: '300px' }} 
            >
              <div className="form-control search-input-ratio">
                <input
                  name="search"
                  type="text"
                  className="form-control"
                  placeholder="Szukaj spółki…"
                  aria-label="Szukaj spółki"
                />
                <button type="submit" className="btn btn-primary search-button-ratio">Szukaj</button>
              </div>
            </form>
          </div>

          {loading
            ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" />
              </div>
            )
            : (
              <>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead>
                      <tr>
                      <th>Spółka</th>
                        <th>Zysk Netto</th>
                        <th>Data Ostatniego Raportu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(c => (
                        <tr key={c.id}>
                          <td>
                            <Link to={`/spolki/${c.id}`} className="nav-link text-dark">
                              {c.companyName}
                            </Link>
                          </td>
                          <td>{c.newestNetProfit}</td>
                          <td>{c.newestRaportDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {items.length > 0 && (
                  <div className="d-flex justify-content-center mt-4">
                    <Pagination
                      current={page}
                      total={total}
                      pageSize={PAGE_SIZE}
                      onChange={setPage}
                    />
                  </div>
                )}

                {items.length === 0 && query && (
                  <p className="text-center no-results mt-4">
                    Brak wyników dla „{query}”
                  </p>
                )}
                {items.length === 0 && !query && (
                  <p className="text-center no-results mt-4">
                    Brak spółek do wyświetlenia. Wyszukaj lub odśwież.
                  </p>
                )}
              </>
            )
          }
        </section>
      </main>

      {/* ——— Footer ——— */}
      <div id="footer" className="bg-light">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>Społeczność</h3>
              <a
                href="https://discord.com" // Replace with actual link if different
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
                {/* These links should ideally point to actual sections or pages */}
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
                {/* These links should ideally point to actual sections or pages */}
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

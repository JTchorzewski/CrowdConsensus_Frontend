import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../OneCompanyPage.css';
import '../Landing.css';
import '../MainPage.css';
import logo from '../assets/logo.png';
import discord from '../assets/discord.png';
import { Menu, X } from 'lucide-react';
import { fetchCompany } from '../services/api'; //  Re-enable this import
import { Spinner } from 'react-bootstrap';
// Re-enable chart imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Pagination from '../components/Pagination';

const PageShell = ({ children, menuOpen, setMenuOpen }) => (
  <div className="main-page-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
    <header className="header border-bottom">
      <div className="container-fluid d-flex align-items-center px-3 px-md-4">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none text-dark">
            <img
              src={logo}
              alt="Crowd Consensus"
              className="d-none d-md-block"
              style={{ height: 111, width: 124.44 }}
            />
            <h1 className="h4 m-0">Crowd Consensus</h1>
          </Link>
        </div>

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

        <div className="d-md-none ms-auto" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {menuOpen && (
          <div
            className="w-100 d-md-none mt-3 mobile-menu-items position-absolute bg-white shadow-lg"
            style={{ top: '100%', left: 0, right: 0, zIndex: 1000 }}
          >
            <ul className="nav flex-column gap-2 p-3">
              <li className="nav-item">
                <Link to="/spolki" className="nav-link text-dark px-2" onClick={() => setMenuOpen(false)}>
                  Firmy
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/predykcje" className="nav-link text-dark px-2" onClick={() => setMenuOpen(false)}>
                  Predykcje
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="btn btn-primary w-100 mt-2" onClick={() => setMenuOpen(false)}>
                  Profil
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>

    <div className="flex-grow-1">
      {children}
    </div>

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


export default function OneCompanyPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState(null); // New state for API errors
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10
  useEffect(() => {
    let isMounted = true; // Flag to prevent state update on unmounted component
    setLoading(true);
    setError(null); // Reset error on new fetch

    console.log(`Fetching company data for ID: ${id} from backend...`);

    fetchCompany(id)
      .then(data => {
        if (!isMounted) return; // Don't update if component unmounted

        if (data) { // data could be null if fetchCompany returns null for 404
          console.log("Received company data:", data);
          const processedData = {
            ...data,
            companyName: data.items?.[0]?.companyName ?? "Brak nazwy",
            revenueStatements: Array.isArray(data.items) ? data.items.map(item => {
              const [year, quarterRaw] = item.raportDate.split('/'); // np. "2005", "Q2"
              const quarter = quarterRaw?.replace('Q', '');
              return {
                ...item,
                  year,
                  quarter,
                  label: `${item.raportDate}`, // lub: `Q${quarter} ${year}`
               };
              }) : []
          };
          setCompany(processedData);
        } else {
          // Handle case where API returns null (e.g., 404 Not Found from api.js)
          console.warn(`No data returned for company ID: ${id}. Likely a 404.`);
          setCompany(null);
        }
      })
      .catch(err => {
        if (!isMounted) return;
        console.error("Error fetching company data:", err);
        setError(err.message || "Wystąpił problem podczas ładowania danych spółki.");
        setCompany(null); // Ensure company is null on error
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Cleanup function to set flag on unmount
    };
  }, [id]);

  if (loading) {
    return (
        <PageShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '300px'}}>
                <Spinner animation="border" variant="primary" />
            </div>
        </PageShell>
    );
  }

  // If there was an API error OR if the company data is null (e.g., 404)
  if (error || !company) {
    return (
        <PageShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
            <main className="container mt-4 d-flex flex-column align-items-center justify-content-center text-center py-5 flex-grow-1">
                 <h1 className="display-4 text-muted mb-3">😕</h1>
                 <p className="h4 mb-3">{error || "Nie znaleziono spółki lub wystąpił błąd."}</p>
                 <Link to="/spolki" className="btn btn-primary btn-lg mt-3">Powrót do listy spółek</Link>
            </main>
        </PageShell>
    );
  }

  // Destructure after ensuring company is not null
  const {
    companyName = "Brak nazwy",
    reportDate,
    netProfit = 0,
    revenueStatements = [] // Already processed with labels
  } = company;

  return (
    <PageShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <main className="container mt-4">
        <section className="bg-white rounded shadow-sm p-4 company-section">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h2 className="fw-bold main-title mb-2 mb-sm-0">
              <span className="text-primary">{companyName}</span>
            </h2>
            <Link to="/spolki" className="btn btn-outline-secondary">← Powrót do listy</Link>
          </div>

          <div className="row mb-4">
            <div className="col-12 mt-4">
  <h4 className="mb-3">Raporty Finansowe</h4>

  {loading ? (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status" />
    </div>
  ) : (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0">
          <thead>
            <tr>
              <th>Data Raportu</th>
              <th>Zysk Netto</th>
              <th>Przychód</th>
            </tr>
          </thead>
          <tbody>
            {revenueStatements
              .map(c => (
                <tr key={c.id}>
                  <td>
                    {c.raportDate}
                  </td>
                  <td>
                    {c.netProfit}
                  </td>
                  <td>
                    {c.revenue}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {revenueStatements.length > PAGE_SIZE && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            current={page}
            total={revenueStatements.length}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
        </div>
      )}

      {revenueStatements.length === 0 && (
        <p className="text-center mt-4">Brak raportów do wyświetlenia.</p>
      )}
    </>
  )}
</div>

            {/* Only show revenue pills if there's data */}
            {revenueStatements.length > 0 && (
              <div className="col-lg-7 col-md-6 revenue-statements">
                <h4 className="mb-3">Przychód wg kwartałów</h4>
                <div className="d-flex flex-wrap gap-2">
                  {revenueStatements.map(q => (
                    <div key={`${q.year}-${q.quarter}`} className="rev-pill">
                      Q{q.quarter} {q.year}:<br/>
                      <strong>{
                        (typeof q.revenue === 'number' ? q.revenue : 0).toLocaleString('pl-PL', {
                          style: 'currency',
                          currency: 'PLN'
                        })}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div> {/* End of .row */}

          {/* Chart Section - Render if revenueStatements has data */}
          {revenueStatements.length > 0 ? (
            <div className="chart-container mt-4">
              <h4 className="mb-3">Historia Notowań (przychód per kwartał)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueStatements} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis 
                    tickFormatter={value => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M PLN`;
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}k PLN`;
                        return `${value} PLN`;
                    }}
                  />
                  <Tooltip formatter={(value) => (typeof value === 'number' ? value.toLocaleString('pl-PL',{ style:'currency', currency:'PLN' }) : value) } />
                  <Legend />
                  <Bar dataKey="revenue" name="Przychód" fill="#4D6796" /> {/* Use your primary color */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="no-chart-data-section mt-4 p-3 bg-light rounded border">
              <p className="text-muted text-center mb-0">Brak danych o przychodach kwartalnych do wyświetlenia wykresu.</p>
            </div>
          )}

        </section>
      </main>
    </PageShell>
  );
}
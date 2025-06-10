import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../OneCompanyPage.css';
import '../Landing.css';
import '../MainPage.css';
import { Spinner } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import Pagination from '../components/Pagination';
import { fetchCompany } from '../services/api';
import PageShell from '../components/PageShell.jsx';

export default function OneCompanyPage() {
  const { id } = useParams();
  const [company, setCompany]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError]       = useState(null);
  const [page, setPage]         = useState(1);
  const [reportPage, setReportPage] = useState(1);

  const PAGE_SIZE = 10;
  const REPORT_PAGE_SIZE = 15;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchCompany(id)
      .then(data => {
        if (!isMounted) return;
        if (data) {
          const processed = {
            ...data,
            companyName: data.items?.[0]?.companyName ?? "Brak nazwy",
            revenueStatements: Array.isArray(data.items)
              ? data.items.map(item => {
                  const [year, quarterRaw] = item.raportDate.split('/');
                  const quarter = quarterRaw.replace('Q', '');
                  return {
                    ...item,
                    year,
                    quarter,
                    label: `Q${quarter} ${year}`
                  };
                })
              : []
          };
          setCompany(processed);
        } else {
          setCompany(null);
        }
      })
      .catch(err => {
        if (!isMounted) return;
        setError(err.message || "Wystąpił problem podczas ładowania danych spółki.");
        setCompany(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <PageShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </PageShell>
    );
  }

  if (error || !company) {
    return (
      <PageShell menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
        <main className="container mt-4 text-center py-5 flex-grow-1">
          <h1 className="display-4 text-muted mb-3">😕</h1>
          <p className="h4 mb-3">{error || "Nie znaleziono spółki lub wystąpił błąd."}</p>
          <Link to="/spolki" className="btn btn-primary btn-lg mt-3">Powrót do listy spółek</Link>
        </main>
      </PageShell>
    );
  }

  const { companyName = "Brak nazwy", revenueStatements = [] } = company;
  const pagedRevenues = revenueStatements.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);
  const pagedReports  = revenueStatements.slice((reportPage-1)*REPORT_PAGE_SIZE, reportPage*REPORT_PAGE_SIZE);

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

          {/* Raporty Finansowe */}
          <div className="row mb-4">
            <div className="col-12">
              <h4 className="mb-3">Raporty Finansowe</h4>
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
                    {pagedReports.map(r => (
                      <tr key={r.id}>
                        <td>{r.raportDate}</td>
                        <td>{r.netProfit}</td>
                        <td>{r.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {revenueStatements.length > REPORT_PAGE_SIZE && (
                <div className="d-flex justify-content-center mt-3">
                  <Pagination
                    current={reportPage}
                    total={revenueStatements.length}
                    pageSize={REPORT_PAGE_SIZE}
                    onChange={setReportPage}
                  />
                </div>
              )}
              {revenueStatements.length === 0 && (
                <p className="text-center mt-4">Brak raportów do wyświetlenia.</p>
              )}
            </div>
          </div>

          {/* Przychód wg kwartałów */}
          {revenueStatements.length > 0 && (
            <div className="row mb-4">
              <div className="col-12">
                <h4 className="mb-3">Przychód wg kwartałów</h4>
                <div
                  className="d-flex flex-wrap gap-2 mb-4"
                  style={{ maxHeight: '400px', overflowY: 'auto', scrollBehavior: 'smooth' }}
                >
                  {pagedRevenues.map(q => (
                    <div key={`rev-${q.year}-${q.quarter}`} className="rev-pill">
                      {q.label}:<br/>
                      <strong>
                        {(typeof q.revenue === 'number' ? q.revenue : 0)
                          .toLocaleString('pl-PL',{ style:'currency', currency:'PLN' })}
                      </strong>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center">
                  <Pagination
                    current={page}
                    total={revenueStatements.length}
                    pageSize={PAGE_SIZE}
                    onChange={setPage}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Chart */}
          {revenueStatements.length > 0 ? (
            <div className="chart-container mt-4">
              <h4 className="mb-3">Historia Notowań (przychód per kwartał)</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueStatements} margin={{ top:5,right:20,left:20,bottom:5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis tickFormatter={v => {
                    if (v >= 1e6) return `${(v/1e6).toFixed(1)}M PLN`;
                    if (v >= 1e3) return `${(v/1e3).toFixed(0)}k PLN`;
                    return `${v} PLN`;
                  }}/>
                  <Tooltip formatter={val =>
                    typeof val === 'number'
                      ? val.toLocaleString('pl-PL',{ style:'currency', currency:'PLN' })
                      : val
                  }/>
                  <Legend />
                  <Bar dataKey="revenue" name="Przychód" fill="#4D6796" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="no-chart-data-section mt-4 p-3 bg-light rounded border">
              <p className="text-muted text-center mb-0">
                Brak danych o przychodach kwartalnych do wyświetlenia wykresu.
              </p>
            </div>
          )}
        </section>
      </main>
    </PageShell>
  );
}

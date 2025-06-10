import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import discord from '../assets/discord.png';
import { Menu, X } from 'lucide-react';

export default function PageShell({ children, menuOpen, setMenuOpen }) {
  return (
    <div className="main-page-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
      <header className="header border-bottom">
        <div className="container-fluid d-flex align-items-center px-3 px-md-4">
          <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none text-dark">
            <img
              src={logo}
              alt="Crowd Consensus"
              className="d-none d-md-block"
              style={{ height: 111, width: 124.44 }}
            />
            <h1 className="h4 m-0">Crowd Consensus</h1>
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

      <div className="flex-grow-1">{children}</div>

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

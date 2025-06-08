import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Landing.css';
import '../MainPage.css';
import '../ContactPage.css'; 
import logo from '../assets/logo.png';
import discord from '../assets/discord.png';
import { Menu, X } from 'lucide-react';

const ContactPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="main-page-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header className="header border-bottom bg-white py-3">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-4">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <img src={logo} alt="Crowd Consensus" style={{ height: "111px", width: "124.44px"  }} />
            </Link>
            <nav className="d-none d-md-flex gap-4">
              <Link to="/spolki" className="nav-link text-dark fw-medium">Firmy</Link>
              <Link to="/predykcje" className="nav-link text-dark fw-medium">Predykcje</Link>
            </nav>
          </div>

          <div className="d-none d-md-block">
            <Link to="/profile" className="btn btn-primary px-4 fw-semibold rounded">Profil</Link>
          </div>

          {/* Mobile hamburger */}
          <div className="d-md-none" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {menuOpen && (
          <div className="d-md-none mt-2 px-3">
            <Link to="/spolki" className="btn btn-outline-secondary w-100 mb-2">Firmy</Link>
            <Link to="/predykcje" className="btn btn-outline-secondary w-100 mb-2">Predykcje</Link>
            <Link to="/profile" className="btn btn-primary w-100">Profil</Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="contact-container container-fluid py-5 px-lg-5">
  <div className="row justify-content-center">
    <div className="col-12">
        <div className="row bg-white shadow-sm rounded p-4 align-items-start w-100 g-5">
                {/* Dane kontaktowe */}
                <div className="col-md-5 mb-4 mb-md-0">
                  <h5 className="fw-bold mb-3">Dane kontaktowe</h5>
                  <div className="mb-3">
                    <div className="fw-semibold">Mail</div>
                    <div>support@crowdconsensus.pl</div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <img src={discord} alt="Discord" style={{ width: 24, height: 24 }} />
                    <a href="#" className="text-primary text-decoration-none fw-medium">Dołącz do nas</a>
                  </div>
                </div>

                {/* Formularz kontaktowy */}
                <div className="col-md-7 ps-md-5">
                  <h5 className="fw-bold mb-3">Formularz kontaktowy</h5>
                  <form style={{ maxWidth: '600px' }}>
                    <div className="mb-3">
                      <label className="form-label">Twój e-mail</label>
                      <input
                        type="email"
                        className="form-control form-control-lg-custom"
                        placeholder="np. jan.kowalski@email.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Temat</label>
                      <input type="text" className="form-control form-control-lg-custom" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Wiadomość</label>
                      <textarea className="form-control form-control-lg-custom" rows="5" />
                    </div>
                    <button type="submit" className="btn btn-primary px-4">Wyślij</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
};

export default ContactPage;

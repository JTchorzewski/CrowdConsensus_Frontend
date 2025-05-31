import '../Landing.css';
import logo from "../assets/logo.png";
import logo1 from "../assets/logo1.png";
import discord from "../assets/discord.png";
import illustration from "../assets/illustration/illustration.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom">
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Logo" className="d-none d-md-block" style={{ height: "111px", width: "124.44px" }} />
          <h1 className="h4 m-0">Crowd Consensus</h1>
        </div>

        <div className="d-md-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <nav className={`d-md-flex ${menuOpen ? 'd-flex flex-column gap-2 mt-3' : 'd-none'}`}>
          <ul className="nav gap-4 flex-column flex-md-row align-items-center">
            <li className="nav-item"><a href="/spolki" className="nav-link text-dark">Firmy</a></li>
            <li className="nav-item"><a href="#about" className="nav-link text-dark">O nas</a></li>
            <li className="nav-item"><a href="#contact" className="nav-link text-dark">Kontakt</a></li>
          </ul>
        </nav>

        <div className="mobile-menu-buttons d-none d-md-flex gap-3">
          <Link to="/login" className="btn btn-outline-primary">Zaloguj się</Link>
          <Link to="/register" className="btn btn-primary">Utwórz konto</Link>
        </div>

        {menuOpen && (
          <div className="mobile-menu-buttons d-flex flex-column gap-2 mt-3 d-md-none">
            <Link to="/login" className="btn btn-outline-primary">Zaloguj się</Link>
            <Link to="/register" className="btn btn-primary">Utwórz konto</Link>
          </div>
        )}
      </header>

      <section id="services" className="py-5 bg-white rounded shadow-sm my-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 ps-lg-5 d-flex flex-column justify-content-start" style={{ paddingBottom: "50px" }}>
            <h3 className="fw-bold" style={{ fontSize: '2.5rem', paddingLeft: '20px' }}>
              <span className="text-primary">Twoja</span><br />
              przygoda<br />
              zaczyna się<br />
              z nami
            </h3>

            <div className="mobiledispplaybuttons">
            <form className="d-flex flex-column gap-3 mt-4" style={{ maxWidth: "380px" }}>
              <input
                type="email"
                placeholder="E-mail"
                className="form-control"
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/register')}
              >
                Utwórz konto
              </button>
            </form>
            </div>

            <div className="card mt-4" style={{ maxWidth: "419px" }}>
              <div className="card-body">
                <h3 className="card-title">Premium +</h3>
                <ul className="list-unstyled mb-0">
                  <li>Wgląd do raportów spółek ✔️</li>
                  <li>E-portfel ✔️</li>
                  <li>Prowizja na przewidywaniach ✖️</li>
                  <li>Algorytm przewidujący notowania ✔️</li>
                  <li>Priority Support 24/7 ✔️</li>
                  <li>Inwestycje Pro ✔️</li>
                </ul>
              </div>
            </div>

            <div className="card mt-4" style={{ maxWidth: "419px" }}>
              <div className="card-body">
                <h3 className="card-title">Standard</h3>
                <ul className="list-unstyled mb-0">
                  <li>Wgląd do raportów spółek ✔️</li>
                  <li>E-portfel ✔️</li>
                  <li>Prowizja na przewidywaniach ✔️</li>
                  <li>Algorytm przewidujący notowania ✖️</li>
                  <li>Priority Support 24/7 ✖️</li>
                  <li>Inwestycje Pro ✖️</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6 text-center d-flex flex-column align-items-center gap-4">
            <img src={illustration} alt="Ilustracja" className="img-fluid rounded-3 border" style={{ maxWidth: "414px" }} />

            <div className="bg-light border rounded-3 p-4" style={{ maxWidth: "371px" }}>
              <p className="mb-0">
                <strong>Inwestuj w przewidywania raportowe ponad <span className="text-primary">500+</span> polskich spółek,</strong><br />
                mnożąc swój kapitał,<br />
                zabezpieczając sobie <span className="text-primary">przyszłość.</span>
              </p>
            </div>

            <div className="card card-subscription text-center mt-4" style={{ maxWidth: "419px", minWidth: "371px" }}>
              <div className="card-body">
                <h3 className="card-title">Premium +</h3>
                <p className="card-text">Tylko 49.99/msc</p>
                <p className="card-text">Anuluj w każdej chwili</p>
                <button className="btn btn-primary mt-3">Dowiedz się więcej</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="logos" className="py-5 my-4 bg-white rounded shadow-sm text-center">
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {[logo, logo1, logo, logo1, logo, logo1].map((imgSrc, index) => (
            <div key={index} className="p-2">
              <img src={imgSrc} alt={`Logo ${index + 1}`} style={{ maxHeight: "150px", objectFit: "contain" }} />
            </div>
          ))}
        </div>
      </section>

      <div id= "footer" className="bg-light">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>Społeczność</h3>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="discord-wrapper d-flex align-items-center gap-2 text-dark text-decoration-none">
                <img src={discord} alt="Discord" style={{ width: "24px", height: "24px" }} />
                Discord
              </a>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>O nas</h3>
              <div className="d-flex flex-column">
                <a href="#about" className="text-dark text-decoration-none">O nas</a>
                <a href="#career" className="text-dark text-decoration-none">Kariera</a>
                <a href="#terms" className="text-dark text-decoration-none">Warunki korzystania</a>
                <a href="#privacy" className="text-dark text-decoration-none">Polityka prywatności</a>
                <a href="#downloads" className="text-dark text-decoration-none">Do pobrania</a>
                <a href="#contact" className="text-dark text-decoration-none">Kontakt</a>
              </div>
            </div>
            <div className="col-md-4">
              <h3>Produkty</h3>
              <div className="d-flex flex-column">
                <a href="#stock-info" className="text-dark text-decoration-none">Informacje giełdowe</a>
                <a href="#predictions" className="text-dark text-decoration-none">Predykcje giełdowe</a>
                <a href="#research" className="text-dark text-decoration-none">Research</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="text-center py-4 small text-muted">
            <p className="mb-0">© CrowdConsensus 2025 – Wszelkie prawa zastrzeżone.</p>
          </div>
    </div>
  );
}

export default LandingPage;

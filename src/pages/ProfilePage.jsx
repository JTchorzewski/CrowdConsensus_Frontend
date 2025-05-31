import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Landing.css';
import '../MainPage.css';
import logo from '../assets/logo.png';
import discord from '../assets/discord.png';
import '../ProfilePage.css';
import { Menu, X } from 'lucide-react';

const ProfilePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="main-page-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>
      <header className="header border-bottom">
        <div className="container-fluid d-flex align-items-center px-3 px-md-4 py-2">
          <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none text-dark">
            <img src={logo} alt="Crowd Consensus" style={{ height: 111, width: 124.44 }} />
          </Link>
          <nav className="d-none d-md-flex ms-4">
  <ul className="nav gap-3">
    <li className="nav-item"><Link to="/spolki" className="nav-link text-dark">Firmy</Link></li>
    <li className="nav-item"><Link to="/predykcje" className="nav-link text-dark">Predykcje</Link></li>
    <li className="nav-item"><Link to="/o-nas#about" className="nav-link text-dark">O nas</Link></li>
    <li className="nav-item"><Link to="/kontakt" className="nav-link text-dark">Kontakt</Link></li>
  </ul>
</nav>

          <div className="d-md-none ms-auto" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {menuOpen && (
          <div className="w-100 d-md-none mt-3 mobile-menu-items position-absolute bg-white shadow-lg" style={{ top: '100%', left: 0, right: 0, zIndex: 1000 }}>
            <ul className="nav flex-column gap-2 p-3">
  <li className="nav-item"><Link to="/spolki" className="nav-link text-dark px-2" onClick={() => setMenuOpen(false)}>Firmy</Link></li>
  <li className="nav-item"><Link to="/predykcje" className="nav-link text-dark px-2" onClick={() => setMenuOpen(false)}>Predykcje</Link></li>
  <li className="nav-item"><Link to="/o-nas#about" className="nav-link text-dark px-2" onClick={() => setMenuOpen(false)}>O nas</Link></li>
  <li className="nav-item"><Link to="/kontakt" className="nav-link text-dark px-2" onClick={() => setMenuOpen(false)}>Kontakt</Link></li>
</ul>

          </div>
        )}
      </header>

      <main className="profile-container container py-4">
        <div className="profile-section pseudonym-section container">
  <div className="row h-100 align-items-center">
    <div className="col-md-9">
    <h2 className="profile-section-title">Profil</h2>
      <h3 className="pseudonym-label">Pseudonim</h3>
      <p className="pseudonym-description">
        Ustaw swój pseudonim, nie używaj prawdziwego imienia i nazwiska oraz nie używaj wulgaryzmów.
        Zmiana pseudonimu jest dostępna raz na 60 dni.
      </p>
    </div>
    <div className="col-md-3 text-md-end text-start mt-3 mt-md-0">
      <button className="btn btn-edit">Edytuj</button>
    </div>
  </div>
</div>
<div className="profile-section container">
  <div className="row h-100 align-items-start">
    <div className="col-12">
  <h2 className="fw-bold text-primary fs-3 mb-4">Powiadomienia i Preferencje</h2>

  <div className="row align-items-center mb-4">
    <div className="col-md-9">
      <h3 className="notification-label">Preferencje dotyczące powiadomień</h3>
      <p className="notification-description">
        Po konfiguracji będziesz otrzymywać alerty na wybrane przez ciebie metody komunikacji.
      </p>
    </div>
    <div className="col-md-3 text-md-end text-start mt-3 mt-md-0">
      <button className="btn btn-edit">Edytuj</button>
    </div>
  </div>

  <div className="row align-items-center mb-4">
    <div className="col-md-9">
      <h3 className="notification-label">Automatyczny alert</h3>
      <p className="notification-description">
        Po konfiguracji będziesz otrzymywać alerty o nagłych zmianach wycen spółek.
      </p>
    </div>
    <div className="col-md-3 text-md-end text-start mt-3 mt-md-0">
      <button className="btn btn-edit">Edytuj</button>
    </div>
  </div>

  <div className="row align-items-center">
    <div className="col-md-9">
      <h3 className="notification-label">Strefa czasowa</h3>
      <p className="notification-description">
        Po konfiguracji będziesz otrzymywać alerty w swojej strefie czasowej.
      </p>
    </div>
    <div className="col-md-3 text-md-end text-start mt-3 mt-md-0">
      <button className="btn btn-edit">Edytuj</button>
    </div>
  </div>
</div>
  </div>
</div>
<div className="profile-section container">
  <div className="row h-100 align-items-center">
    <div className="col-md-9">
      <h2 className="profile-section-title">Połącz swoje konto</h2>

      <h3 className="notification-label">Połącz konto X</h3>
      <p className="notification-description">
        Połącz swoje konto na X z Consensus i otrzymaj nagrodę.
      </p>
    </div>
    <div className="col-md-3 text-md-end text-start mt-3 mt-md-0">
      <button className="btn btn-edit">Link</button>
    </div>
  </div>
</div>
<div className="profile-section container">
  <h2 className="profile-section-title">Prywatność</h2>

  <div className="row align-items-center mb-4">
    <div className="col-md-9">
      <h3 className="notification-label">Dane osobowe</h3>
      <p className="notification-description">
        Pobierane dane obejmują profil, historię płatności i przeglądania.
      </p>
    </div>
    <div className="col-md-3 text-md-end text-start">
      <button className="btn btn-edit w-100">Pobierz</button>
    </div>
  </div>

  <div className="row align-items-center mb-4">
    <div className="col-md-9">
      <h3 className="notification-label">Aktualizacja dokumentów</h3>
      <p className="notification-description">
        Zmiana dokumentów, jeśli zmieniłeś rezydencję zamieszkania.
      </p>
    </div>
    <div className="col-md-3 text-md-end text-start">
      <button className="btn btn-edit w-100">Aktualizuj</button>
    </div>
  </div>

  <div className="row align-items-center">
    <div className="col-md-9">
      <h3 className="notification-label">Usunięcie konta</h3>
      <p className="notification-description">
        Usuń swoje konto, pamiętaj, że jest to nieodwracalne.
      </p>
    </div>
    <div className="col-md-3 text-md-end text-start">
      <button className="btn btn-edit w-100">Przejdź</button>
    </div>
  </div>
</div>
<div className="profile-section section-6">
  <div className="row">
    <div className="col-md-4">
      <h3 className="footer-column-title">Społeczność</h3>
      <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="discord-wrapper d-flex align-items-center gap-2 text-decoration-none">
        <img src={discord} alt="Discord" style={{ width: "24px", height: "24px" }} />
        <span className="footer-link">Discord</span>
      </a>
    </div>
    <div className="col-md-4">
      <h3 className="footer-column-title">O nas</h3>
      <div className="d-flex flex-column">
        <Link to="/o-nas#about" className="footer-link">O nas</Link>
        <Link to="/kariera" className="footer-link">Kariera</Link>
        <Link to="/warunki-korzystania" className="footer-link">Warunki korzystania</Link>
        <Link to="/polityka-prywatnosci" className="footer-link">Polityka prywatności</Link>
        <Link to="/do-pobrania" className="footer-link">Do pobrania</Link>
        <Link to="/kontakt" className="footer-link">Kontakt</Link>
      </div>
    </div>
    <div className="col-md-4">
      <h3 className="footer-column-title">Produkty</h3>
      <div className="d-flex flex-column">
        <Link to="/informacje-gieldowe" className="footer-link">Informacje giełdowe</Link>
        <Link to="/predykcje-gieldowe" className="footer-link">Predykcje giełdowe</Link>
        <Link to="/research" className="footer-link">Research</Link>
      </div>
    </div>
  </div>
  <div className="text-center small text-muted mt-4">
    <p className="mb-0">© Consensus 2025 – Wszelkie prawa zastrzeżone.</p>
  </div>
</div>

        {/* Tu kolejne sekcje profilu */}
      </main>

     
    </div>
  );
};

export default ProfilePage;

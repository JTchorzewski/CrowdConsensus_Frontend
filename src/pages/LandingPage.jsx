import logo from "../assets/logo.png";
import logo1 from "../assets/logo1.png";
import discord from "../assets/discord.png";
import illustration from "../assets/illustration/illustration.png";


function LandingPage() {
  return (
    <div className="container">
      <header className="header">
      <div className="logo-container">
      <img src={logo} alt="Logo" className="logo-img" />
  <h1>Crowd Consensus</h1>
</div>

        <nav>
          <ul>
            <li><a href="#services">Usługi</a></li>
            <li><a href="#about">O nas</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
        <button className="login-btn" onClick={() => window.location.href = '/login'}>
  Zaloguj się
</button>

<button className="signup-btn" onClick={() => window.location.href = '/register'}>
  Utwórz konto
</button>

        </div>
      </header>
      <section id="services" className="section services-section">
  <div className="services-content">
    <div className="services-text">
      <h3>
        <span className="highlight">Twoja</span><br />
        przygoda<br />
        zaczyna się<br />
        z nami
      </h3>

      <form className="email-form">
        <input
          type="email"
          placeholder="E-mail"
          className="email-input"
          required
        />
        <button
          type="button"
          className="cta-button"
          onClick={() => window.location.href = '/register'}
        >
          Utwórz konto
        </button>
      </form>
      <div className="feature-box">
    <h3>Premium +</h3>
    <p>Wgląd do raportów spółek ✔️ </p>
    <p>E-portfel ✔️</p>
    <p>Prowizja na przewidywaniach ✖️ </p> 
    <p>Algorytm przewidujący notowania ✔️ </p>
    <p>Priority Support 24/7 ✔️ </p>
    <p>Inwestycje Pro ✔️ </p>
  </div>
  <div className="feature-box">
    <h3>Standard</h3>
    <p>Wgląd do raportów spółek ✔️</p>
    <p>E-portfel ✔️</p>
    <p>Prowizja na przewidywaniach ✔️</p>
    <p>Algorytm przewidujący notowania ✖️</p>
    <p>Priority Support 24/7 ✖️</p>
    <p>Inwestycje Pro ✖️</p>
  </div>
    </div>

    <div className="services-image">
      <img src={illustration} alt="Ilustracja" />
      <div className="info-box">
  <p>
    <strong>Inwestuj w przewidywania raportowe ponad <span className="highlight-blue">500+</span> polskich spółek,</strong><br />
    mnożąc swój kapitał,<br />
    zabezpieczając sobie <span className="highlight-blue">przyszłość.</span>
  </p>
</div>
<div className="plans-box">
  <h3>Premium +</h3>
  <p>Tylko 49.99/msc</p>
  <p>Anuluj w każdej chwili</p>
  <button className="learn-more-btn">Dowiedz się więcej</button>
</div>


    </div>
    
  

  </div>
  
</section>



<section id="logos" className="section logos-section">
  <div className="logos-container">
    <div className="logo-item">
      <img src={logo} alt="Logo 1" className="logo-img1" />
    </div>
    <div className="logo-item">
      <img src={logo1} alt="Logo 2" className="logo-img1" />
    </div>
    <div className="logo-item">
      <img src={logo} alt="Logo 3" className="logo-img1" />
    </div>
    <div className="logo-item">
      <img src={logo1} alt="Logo 4" className="logo-img1" />
    </div>
    <div className="logo-item">
      <img src={logo} alt="Logo 5" className="logo-img1" />
    </div>
    <div className="logo-item">
      <img src={logo1} alt="Logo 6" className="logo-img1" />
    </div>
  </div>
</section>


<footer className="footer">
  <div className="social">
    <h3>Społeczność</h3>
    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
      <img src={discord} alt="Logo 7" className="logo-img2" />
      Discord
    </a>
  </div>

  <div className="about">
    <h3>O nas</h3>
    <a href="#about">O nas</a>
    <a href="#career">Kariera</a>
    <a href="#terms">Warunki korzystania</a>
    <a href="#privacy">Polityka prywatności</a>
    <a href="#downloads">Do pobrania</a>
    <a href="#contact">Kontakt</a>
  </div>

  <div className="products">
    <h3>Produkty</h3>
    <a href="#stock-info">Informacje giełdowe</a>
    <a href="#predictions">Predykcje giełdowe</a>
    <a href="#research">Research</a>
  </div>
</footer>

<div className="copy">
  <p>© CrowdConsensus 2025 – Wszelkie prawa zastrzeżone.</p>
</div>

    </div>
  );
}

export default LandingPage;

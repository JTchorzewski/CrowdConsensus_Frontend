import React from "react";
import SpolkiList from "./components/SpolkiList.jsx";  // Zmieniona ścieżka importu

function App() {
  const spolki = [
    { Nazwa: "Spółka A SPA", "Ticker Data Raportu": "2025-05-01", Grupa: "WIG20" },
    { Nazwa: "Spółka B SPB", "Ticker Data Raportu": "2025-06-15", Grupa: "mWIG40" },
    { Nazwa: "Spółka C SPC", "Ticker Data Raportu": "2025-07-20", Grupa: "sWIG80" },
    { Nazwa: "Spółka D SPD", "Ticker Data Raportu": "2025-08-10", Grupa: "WIG20" },
    { Nazwa: "Spółka E SPE", "Ticker Data Raportu": "2025-09-05", Grupa: "mWIG40" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "2rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f8f9fa",
      color: "#333",
    }}>
      <h1 style={{ 
        textAlign: "center", 
        marginBottom: "1.5rem",
        color: "#2c3e50",
        fontSize: "2.5rem",
        fontWeight: "600",
      }}>
        Akcje na Giełdzie
      </h1>
      
      <SpolkiList spolki={spolki} />
      
      <footer style={{
        marginTop: "2rem",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#7f8c8d",
      }}>
        © {new Date().getFullYear()} Aplikacja Giełdowa
      </footer>
    </div>
  );
}

export default App;
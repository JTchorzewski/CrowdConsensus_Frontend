import React from "react";
import CompanyTable from "./components/CompanyTable.jsx";

function App() {
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
      
      <CompanyTable />
      
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
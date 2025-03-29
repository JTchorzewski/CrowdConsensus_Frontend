import React from "react";

const SpolkiList = ({ spolki }) => {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "20px",
      textAlign: "center" 
    }}>
      <h2>Lista Spółek</h2>
      <table style={{ 
        borderCollapse: "collapse", 
        margin: "20px 0", 
        width: "80%", 
        minWidth: "600px",
        maxWidth: "800px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)" 
      }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ padding: "15px", border: "1px solid #ddd" }}>Nazwa</th>
            <th style={{ padding: "15px", border: "1px solid #ddd" }}>Ticker Data Raportu</th>
            <th style={{ padding: "15px", border: "1px solid #ddd" }}>Grupa</th>
          </tr>
        </thead>
        <tbody>
          {spolki.map((spolka, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
              <td style={{ padding: "20px", border: "1px solid #ddd" }}>{spolka.Nazwa}</td>
              <td style={{ padding: "20px", border: "1px solid #ddd" }}>{spolka["Ticker Data Raportu"]}</td>
              <td style={{ padding: "20px", border: "1px solid #ddd" }}>{spolka.Grupa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpolkiList;
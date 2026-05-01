import React from 'react';

export default function Home({ memories }) {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "2.8rem", color: "#d4af37", fontFamily: "'Cinzel', serif" }}>
          Chronicles of the Realm
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {memories.map((memory) => (
          <div key={memory.id} className="parchment-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #d4af37", paddingBottom: "10px", marginBottom: "15px" }}>
              <h3 style={{ fontSize: "1.8rem", margin: 0, color: "#d4af37" }}>{memory.title}</h3>
              <span style={{ color: "#d4af37", border: "1px solid #d4af37", fontFamily: "'Cinzel', serif", fontSize: "0.9rem", padding: "3px 8px", borderRadius: "4px" }}>
                {memory.house}
              </span>
            </div>
            
            {/* BAS YAHAN COLOR ADD KIYA HAI TAAKI TEXT CLEAR DIKHE */}
            <p style={{ fontSize: "1.3rem", lineHeight: "1.6", fontWeight: "bold", color: "#f4e4bc" }}>
              "{memory.text}"
            </p>
            
            {/* YAHAN DATE KO BHI GOLD COLOR DIYA HAI */}
            <div style={{ textAlign: "right", marginTop: "15px", fontStyle: "italic", opacity: 0.9, color: "#d4af37" }}>
              — Recorded in {memory.date}
            </div>
          </div>
        ))}
        {memories.length === 0 && <p style={{textAlign:"center", color:"#d4af37", fontStyle:"italic"}}>No ravens have arrived yet.</p>}
      </div>
    </div>
  );
}
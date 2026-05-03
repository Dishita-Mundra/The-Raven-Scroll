import React, { useState, useRef } from 'react';

export default function Scanner() {
  const [image, setImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null); 

  const handleImage = (e) => {
    setResult(null); 
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const startScan = () => {
    if (!image) return;
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const houses = [
        { house: "House Stark", desc: "Winter runs in your veins.", title: "Warden of the North" },
        { house: "House Targaryen", desc: "Fire and Blood! You possess the dragon's spirit.", title: "The Unburnt" },
        { house: "House Lannister", desc: "You always pay your debts.", title: "Lion of Casterly Rock" }
      ];
      setResult(houses[Math.floor(Math.random() * houses.length)]);
    }, 4000); 
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#d4af37", fontFamily: "'Cinzel', serif" }}>The Maester's Oracle</h2>

      {/* Outer Card */}
      <div className="parchment-card" style={{ border: "1px solid #d4af37" }}>
        
        <div 
          onClick={() => fileInputRef.current.click()}
          style={{
            border: "1px dashed #d4af37", padding: "40px 20px", 
            backgroundColor: "rgba(0,0,0,0.6)", color: "#d4af37",
            fontFamily: "'Cinzel', serif", fontSize: "1.5rem",
            marginBottom: "20px", transition: "0.3s"
          }}>
          {image ? "Scroll Received. Click to change." : "PAY YOUR DEBTS (Drop the Portrait Here)"}
        </div>
        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImage} style={{ display: "none" }} />

        {image && (
          <div style={{ margin: "20px 0" }}>
            <img src={image} alt="Preview" style={{ width: "200px", height: "250px", objectFit: "cover", border: "1px solid #d4af37", borderRadius: "4px" }} />
          </div>
        )}

        {image && !isScanning && !result && (
          /* ENTER REALM WALA EXACT BUTTON */
          <button onClick={startScan} style={{
            width: "100%", padding: "15px", backgroundColor: "#8b0000", color: "#f4e4bc",
            border: "1px solid #d4af37", borderRadius: "4px", fontSize: "1.2rem",
            fontFamily: "'Cinzel', serif", cursor: "pointer", transition: "background 0.3s",
            marginTop: "10px"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#5a0000"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#8b0000"}>
            Reveal the Bloodline
          </button>
        )}

        {isScanning && (
          <div style={{ marginTop: "30px" }}>
            <div className="horse-loader">🐎</div>
            {/* Red ki jagah Gold text */}
            <p style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", animation: "pulse 1s infinite", fontSize: "1.2rem" }}>
              Riding to the Citadel... Analyzing Bloodline...
            </p>
          </div>
        )}

        {result && (
          <div style={{ marginTop: "30px", padding: "15px", border: "1px solid #d4af37", backgroundColor: "#111" }}>
            <h3 style={{ fontSize: "2.2rem", color: "#d4af37" }}>{result.house}</h3>
            {/* Red ki jagah Parchment text */}
            <h4 style={{ fontStyle: "italic", color: "#f4e4bc", marginBottom: "10px" }}>"{result.title}"</h4>
            <p style={{ fontSize: "1.2rem", color: "#f4e4bc" }}>{result.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
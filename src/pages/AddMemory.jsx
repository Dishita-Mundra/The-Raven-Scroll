import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddMemory({ setMemories }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', date: '', house: 'House Stark', text: '' });
  const [successMsg, setSuccessMsg] = useState(false);

  const inputStyle = {
    width: "100%", padding: "12px", marginBottom: "20px", 
    backgroundColor: "rgba(0,0,0,0.5)", color: "#f4e4bc", 
    border: "1px solid #d4af37", borderRadius: "4px",
    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", outline: "none"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMemories(prev => [{...formData, id: Date.now()}, ...prev]);
    
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      navigate("/");
    }, 2500);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#d4af37", fontSize: "2.5rem", fontFamily: "'Cinzel', serif" }}>
        Forge Your Tale in Fire and Blood
      </h2>
      
      {successMsg && (
        <div style={{ backgroundColor: "#111", border: "1px solid #d4af37", color: "#d4af37", padding: "15px", textAlign: "center", marginBottom: "20px", fontSize: "1.2rem", animation: "pulse 1s infinite" }}>
          ⚔️ Raven successfully dispatched to The Realm! ⚔️
        </div>
      )}

      <form onSubmit={handleSubmit} className="parchment-card" style={{ border: "1px solid #d4af37" }}>
        
        <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "8px" }}>Title of the Tale</label>
        <input style={inputStyle} type="text" required placeholder="e.g., The Red Wedding" 
          onChange={(e) => setFormData({...formData, title: e.target.value})} />

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "8px" }}>Day of Ruling</label>
            <input style={inputStyle} type="date" required 
              onChange={(e) => setFormData({...formData, date: e.target.value})} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "8px" }}>Pledge to a House</label>
            
            {/* YAHAN OPTIONS KO DETAIL MEIN EXPLAIN KIYA HAI */}
            <select style={inputStyle} onChange={(e) => setFormData({...formData, house: e.target.value})}>
              <option value="House Stark">House Stark (The Noble Northern Family)</option>
              <option value="House Lannister">House Lannister (The Wealthy Family)</option>
              <option value="House Targaryen">House Targaryen (The Dragon Bloodline)</option>
              <option value="Night's Watch">Night's Watch (The Brotherhood at the Wall)</option>
            </select>
          </div>
        </div>

        <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "8px" }}>The Chronicle</label>
        <textarea style={{...inputStyle, height: "150px", resize: "none"}} required placeholder="Let your words be written in history..."
          onChange={(e) => setFormData({...formData, text: e.target.value})}></textarea>

        <button type="submit" style={{
          width: "100%", padding: "15px", backgroundColor: "#8b0000", color: "#f4e4bc",
          border: "1px solid #d4af37", borderRadius: "4px", fontSize: "1.2rem",
          fontFamily: "'Cinzel', serif", cursor: "pointer", transition: "background 0.3s",
          marginTop: "10px"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#5a0000"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#8b0000"}>
          Dispatch the Raven
        </button>
      </form>
    </div>
  );
}
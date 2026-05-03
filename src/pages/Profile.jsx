import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({ currentUser, setIsLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form state
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editPic, setEditPic] = useState(currentUser?.profilePic || '');

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#d4af37" }}>
        <h2 style={{ fontFamily: "'Cinzel', serif" }}>Halt! You must enter the gates first.</h2>
        <button onClick={() => navigate("/auth")} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#8b0000", color: "#f4e4bc", border: "1px solid #d4af37", cursor: "pointer" }}>Go to Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null); 
    navigate("/auth");
  };

  const handleSaveDecree = (e) => {
    e.preventDefault();
    setCurrentUser({ ...currentUser, name: editName, bio: editBio, profilePic: editPic });
    setIsEditing(false); // Edit mode band kardo
  };

  const handlePicUpdate = (e) => {
    if(e.target.files[0]) {
      setEditPic(URL.createObjectURL(e.target.files[0])); // Live preview for edit
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px", marginBottom: "15px", 
    backgroundColor: "rgba(0,0,0,0.5)", color: "#f4e4bc", 
    border: "1px solid #d4af37", borderRadius: "4px",
    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", outline: "none"
  };

  // GOT Themed Royal Frame Style
  const royalFrameStyle = {
    width: "180px", height: "180px", 
    borderRadius: "10px", // Pura gol nahi, thoda square portrait type
    border: "4px solid #d4af37", // Gold border
    outline: "2px solid #8b0000", // Blood Red outline
    outlineOffset: "4px",
    objectFit: "cover",
    boxShadow: "0 0 25px rgba(212, 175, 55, 0.5), inset 0 0 15px rgba(0,0,0,0.8)",
    backgroundColor: "#111"
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center", color: "#f4e4bc" }}>
      <h2 style={{ fontSize: "2.8rem", color: "#d4af37", fontFamily: "'Cinzel', serif", marginBottom: "30px", textShadow: "2px 2px 5px rgba(0,0,0,0.8)" }}>
        My Realm
      </h2>
      
      <div className="parchment-card" style={{ border: "1px solid #d4af37", padding: "40px", backgroundColor: "rgba(10, 10, 10, 0.8)", borderRadius: "10px" }}>
        
        {isEditing ? (
          /* --- EDIT PROFILE FORM (GOT THEME) --- */
          <form onSubmit={handleSaveDecree} style={{ textAlign: "left" }}>
            <h3 style={{ fontSize: "1.8rem", color: "#8b0000", fontFamily: "'Cinzel', serif", textAlign: "center", marginBottom: "20px" }}>
              Amend the Sacred Texts
            </h3>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img src={editPic} alt="Preview" style={royalFrameStyle} />
            </div>

            <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Paint New Portrait (Upload File)</label>
            <input style={{...inputStyle, padding: "9px"}} type="file" accept="image/*" onChange={handlePicUpdate} />

            <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Declare New Title (Name)</label>
            <input style={inputStyle} type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required />

            <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Rewrite Your Legend (Bio)</label>
            <textarea style={{...inputStyle, height: "100px", resize: "none"}} value={editBio} onChange={(e) => setEditBio(e.target.value)} required></textarea>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={{ flex: 1, padding: "12px", backgroundColor: "#8b0000", color: "#f4e4bc", border: "1px solid #d4af37", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "1.1rem" }}>
                Seal the Decree (Save)
              </button>
              <button type="button" onClick={() => setIsEditing(false)} style={{ flex: 1, padding: "12px", backgroundColor: "transparent", color: "#d4af37", border: "1px solid #d4af37", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: "1.1rem" }}>
                Burn the Draft (Cancel)
              </button>
            </div>
          </form>
        ) : (
          /* --- NORMAL PROFILE VIEW --- */
          <>
            <div style={{ marginBottom: "30px", marginTop: "10px" }}>
              <img src={currentUser.profilePic} alt="Profile" style={royalFrameStyle} />
            </div>

            <h3 style={{ fontSize: "2.2rem", color: "#d4af37", fontFamily: "'Cinzel', serif", margin: "10px 0" }}>
              {currentUser.name}
            </h3>

            <p style={{ fontSize: "1.2rem", fontStyle: "italic", margin: "20px 0", lineHeight: "1.6", color: "#e8dcc4", borderTop: "1px solid #8b0000", borderBottom: "1px solid #8b0000", padding: "15px 0" }}>
              "{currentUser.bio}"
            </p>

            {/* EDIT BUTTON */}
            <button onClick={() => setIsEditing(true)} style={{
              width: "100%", padding: "15px", backgroundColor: "transparent", color: "#d4af37",
              border: "1px dashed #d4af37", borderRadius: "4px", fontSize: "1.2rem",
              fontFamily: "'Cinzel', serif", cursor: "pointer", transition: "0.3s",
              fontWeight: "bold", marginBottom: "15px"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "rgba(212, 175, 55, 0.1)"}
            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}>
              Rewrite Your Legend (Edit)
            </button>

            {/* LOGOUT BUTTON */}
            <button onClick={handleLogout} style={{
              width: "100%", padding: "15px", backgroundColor: "#8b0000", color: "#f4e4bc",
              border: "1px solid #d4af37", borderRadius: "4px", fontSize: "1.2rem",
              fontFamily: "'Cinzel', serif", cursor: "pointer", transition: "background 0.3s",
              fontWeight: "bold"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#5a0000"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#8b0000"}>
              Leave the Realm (Logout)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
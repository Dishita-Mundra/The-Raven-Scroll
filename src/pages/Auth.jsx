import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ setIsLoggedIn, setCurrentUser }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [picMode, setPicMode] = useState('url'); 
  const [previewUrl, setPreviewUrl] = useState(''); // NAYA: Live Preview ke liye

  const inputStyle = {
    width: "100%", padding: "12px", marginBottom: "15px", 
    backgroundColor: "rgba(0,0,0,0.5)", color: "#f4e4bc", 
    border: "1px solid #d4af37", borderRadius: "4px",
    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", outline: "none"
  };

  const toggleBtnStyle = (active) => ({
    flex: 1, padding: "8px", backgroundColor: active ? "#8b0000" : "rgba(0,0,0,0.5)",
    color: active ? "#f4e4bc" : "#d4af37", border: "1px solid #d4af37", 
    cursor: "none", fontFamily: "'Cinzel', serif"
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // File ka live URL banaya
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;
      if (password !== confirmPassword) {
        setError("Your secret words do not match!");
        return;
      }
      
      const name = e.target.username.value;
      const bio = e.target.bio.value || "A loyal protector of the realm.";
      
      // PHOTO BUG FIXED: Agar file upload ki hai toh previewUrl use karega
      let pic = "https://i.pinimg.com/736x/8f/c3/78/8fc378d8a70512f45cc3123c51206103.jpg"; // Default
      if (picMode === 'url' && e.target.picUrl.value) {
        pic = e.target.picUrl.value;
      } else if (picMode === 'file' && previewUrl) {
        pic = previewUrl; 
      }

      setCurrentUser({ name, bio, profilePic: pic });
      setIsLoggedIn(true); 
      navigate("/profile"); 
    } else {
      const email = e.target.email.value;
      setCurrentUser({ name: email.split('@')[0], bio: "Returned to the realm.", profilePic: "https://i.pinimg.com/736x/8f/c3/78/8fc378d8a70512f45cc3123c51206103.jpg" });
      setIsLoggedIn(true); 
      navigate("/profile");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px" }}>
      <div className="parchment-card" style={{ textAlign: "center", border: "1px solid #d4af37" }}>
        <h2 style={{ marginBottom: "10px", fontSize: "2.2rem", color: "#d4af37", fontFamily: "'Cinzel', serif" }}>
          {isLogin ? "Return to the Realm" : "Forge Your Legacy"}
        </h2>
        <p style={{ color: "#aaa", marginBottom: "25px", fontStyle: "italic" }}>
          {isLogin ? "Enter your credentials to access your memories." : "Register to start recording your journey."}
        </p>

        {error && <div style={{ color: "#ff4d4d", marginBottom: "15px", fontWeight: "bold" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          {!isLogin && (
            <>
              <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Known As (Name)</label>
              <input style={inputStyle} name="username" type="text" required placeholder="e.g., Jon Snow" />

              <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Portrait (Profile Pic)</label>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <button type="button" onClick={() => setPicMode('url')} style={toggleBtnStyle(picMode === 'url')}>Use URL</button>
                <button type="button" onClick={() => setPicMode('file')} style={toggleBtnStyle(picMode === 'file')}>Upload File</button>
              </div>
              
              {picMode === 'url' ? (
                <input style={inputStyle} name="picUrl" type="url" placeholder="Link to your image..." />
              ) : (
                <>
                  <input style={{...inputStyle, padding: "9px"}} name="picFile" type="file" accept="image/*" onChange={handleFileChange} />
                  {/* LIVE PREVIEW */}
                  {previewUrl && <div style={{textAlign: "center", marginBottom: "15px"}}><img src={previewUrl} alt="Preview" style={{width: "80px", height: "80px", borderRadius: "8px", border: "2px solid #d4af37", objectFit: "cover"}}/></div>}
                </>
              )}

              <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Your Legend (Bio)</label>
              <textarea style={{...inputStyle, height: "80px", resize: "none"}} name="bio" placeholder="A short tale about yourself..."></textarea>
            </>
          )}

          <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Raven's Address (Email)</label>
          <input style={inputStyle} name="email" type="email" required placeholder="e.g., lord@westeros.com" />

          <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Secret Word (Password)</label>
          <input style={inputStyle} name="password" type="password" required placeholder="••••••••" />

          {!isLogin && (
            <>
              <label style={{ color: "#d4af37", fontFamily: "'Cinzel', serif", display: "block", marginBottom: "5px" }}>Confirm Secret Word</label>
              <input style={inputStyle} name="confirmPassword" type="password" required placeholder="••••••••" />
            </>
          )}

          <button type="submit" style={{
            width: "100%", padding: "15px", backgroundColor: "#8b0000", color: "#f4e4bc", border: "1px solid #d4af37", borderRadius: "4px", fontSize: "1.2rem", fontFamily: "'Cinzel', serif", transition: "background 0.3s", marginTop: "10px"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#5a0000"} onMouseOut={(e) => e.target.style.backgroundColor = "#8b0000"}>
            {isLogin ? "Enter the Gates" : "Pledge Fealty"}
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#f4e4bc", fontSize: "1.1rem" }}>
          {isLogin ? "Not known in the realm?" : "Already pledged fealty?"}
          <span onClick={() => { setIsLogin(!isLogin); setError(''); }} style={{ color: "#d4af37", textDecoration: "underline", marginLeft: "8px", fontWeight: "bold" }}>
            {isLogin ? "Register Here" : "Login Here"}
          </span>
        </p>
      </div>
    </div>
  );
}
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./component/Navbar"; 
import Home from "./pages/Home";
import AddMemory from "./pages/AddMemory";
import Auth from "./pages/Auth";
import Scanner from "./pages/Scanner";
import Profile from "./pages/Profile"; 
import CustomCursor from "./component/CustomCursor";
import './index.css';

function App() {
  const [theme, setTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null); // NAYA: User ka data save rakhne ke liye
  
  const [memories, setMemories] = useState([
    { id: 1, title: "The Long Night", date: "Winter 2024", house: "House Stark", text: "The first code was written. We survived the bugs." }
  ]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Router>
      <div className={theme}>
        <CustomCursor />
        
        <div className="snow-container"></div>
        
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          <Navbar theme={theme} toggleTheme={toggleTheme} isLoggedIn={isLoggedIn} />
          <main style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home memories={memories} />} />
              <Route path="/add" element={<AddMemory setMemories={setMemories} />} />
              {/* Auth aur Profile ko Data bheja hai */}
              <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} /> 
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/profile" element={<Profile currentUser={currentUser} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} /> 
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
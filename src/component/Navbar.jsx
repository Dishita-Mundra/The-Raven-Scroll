import { Link, useLocation } from "react-router-dom";
import { Scroll, Feather, User, Eye } from "lucide-react"; 

export default function Navbar({ theme, isLoggedIn }) {
  const location = useLocation();

  const navStyle = {
    backgroundColor: theme === "dark" ? "#0a0a0a" : "#2b1b0e",
    borderBottom: "2px solid #d4af37", padding: "15px 40px",
    display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#d4af37" : (theme === "dark" ? "#f4e4bc" : "#e8dcc4"),
    textDecoration: "none", fontSize: "1.1rem", fontFamily: "'Cinzel', serif",
    display: "flex", alignItems: "center", gap: "5px", transition: "color 0.3s",
    fontWeight: "bold"
  });

  return (
    <nav style={navStyle}>

      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="title-container">
          <div className="small-gola"></div>
          <Scroll size={28} color="#d4af37" style={{ zIndex: 2 }} /> 
          <h1 className="title-glow" style={{ margin: 0, fontSize: "2rem" }}>
            THE RAVEN SCROLL
          </h1>
        </div>
      </Link>
      
      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <Link to="/" style={linkStyle("/")}>The Realm</Link>
        <Link to="/add" style={linkStyle("/add")}><Feather size={18} /> Send Raven</Link>
        <Link to="/scanner" style={linkStyle("/scanner")}><Eye size={18} /> The Oracle</Link>
        
        {isLoggedIn ? (
          <Link to="/profile" style={linkStyle("/profile")}><User size={18} /> My Profile</Link>
        ) : (
          <Link to="/auth" style={linkStyle("/auth")}><User size={18} /> Enter Realm</Link>
        )}
      </div>
    </nav>
  );
}
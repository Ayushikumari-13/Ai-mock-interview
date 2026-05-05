import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div style={sidebar}>

      {/* TOP */}
      <div>
        <h2
          style={logo}
          onClick={() => navigate("/")}
        >
          🤖 AI Mock
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          <NavLink to="/" style={linkStyle}>
            🏠 Home
          </NavLink>

          <NavLink to="/dashboard" style={linkStyle}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/interview" style={linkStyle}>
            🎤 Interview
          </NavLink>

          <NavLink to="/history" style={linkStyle}>
            📜 History
          </NavLink>

          <NavLink to="/login" style={linkStyle}>
            🔐 Login
          </NavLink>

          <NavLink to="/register" style={linkStyle}>
            📝 Register
          </NavLink>

        </nav>
      </div>

      {/* BOTTOM */}
      <button onClick={() => navigate("/")} style={logoutBtn}>
        Logout
      </button>

    </div>
  );
}


// 🎨 STYLES

const sidebar = {
  width: "220px",
  height: "100%",              // 🔥 FIX (100vh हटाया)
  minHeight: "100vh",          // 🔥 stable layout
  background: "#111827",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "#fff",
  boxSizing: "border-box"
};

const logo = {
  marginBottom: "20px",
  cursor: "pointer"
};

const logoutBtn = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#ef4444",
  color: "#fff"
};

// 🔥 ACTIVE STYLE
const linkStyle = ({ isActive }) => ({
  padding: "10px",
  borderRadius: "8px",
  textDecoration: "none",
  color: isActive ? "#fff" : "#9ca3af",
  background: isActive ? "#2563eb" : "transparent",
  fontWeight: isActive ? "bold" : "normal",
  transition: "0.3s"
});
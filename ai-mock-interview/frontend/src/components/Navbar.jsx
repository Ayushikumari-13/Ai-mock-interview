import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#0b1220",
      color: "#fff",
      borderBottom: "1px solid #1f2937"
    }}>
      
      {/* LEFT LOGO */}
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        🤖 AI Mock
      </h2>

      {/* RIGHT BUTTONS */}
      <div style={{ display: "flex", gap: "10px" }}>

        <button style={btnStyle} onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button style={btnStyle} onClick={() => navigate("/interview")}>
          Interview
        </button>

        <button style={btnStyle} onClick={() => navigate("/history")}>
          History
        </button>

        <button style={btnStyle} onClick={() => navigate("/login")}>
          Login
        </button>

      </div>
    </div>
  );
}

// 🔥 Button Style
const btnStyle = {
  padding: "8px 15px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  color: "#fff"
};
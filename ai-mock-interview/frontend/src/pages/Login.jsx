import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ DEPLOYED BACKEND
  const API_URL =
    "https://ai-mock-interview-ny3i.onrender.com";

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {

    try {

      // ✅ EMPTY CHECK
      if (!email || !password) {

        alert("Please fill all fields ❌");
        return;

      }

      setLoading(true);

      // ✅ API CALL
      const res = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // ✅ SAFE JSON
      const data = await res.json();

      console.log("🔥 LOGIN RESPONSE:", data);

      // ❌ ERROR
      if (!res.ok) {

        alert(
          data.message ||
          data.error ||
          "Login failed ❌"
        );

        return;

      }

      // ✅ SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token || "dummy-token"
      );

      // ✅ SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // ✅ SUCCESS
      alert("Login Successful ✅");

      // ✅ REDIRECT
      navigate("/dashboard");

    } catch (err) {

      console.error("LOGIN ERROR:", err);

      alert("Backend not connected ❌");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          🔐 Login
        </h1>

        <p style={subtitle}>
          Welcome back to AI Mock Interview
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={input}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={input}
        />

        {/* LOGIN BUTTON */}
        <button
          style={button}
          onClick={handleLogin}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        {/* REGISTER */}
        <p style={text}>

          Don't have an account?{" "}

          <span
            style={link}
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
}


// 🎨 STYLES

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(135deg, #020617, #0f172a)",
  padding: "20px",
};

const card = {
  background: "#111827",
  padding: "35px",
  borderRadius: "18px",
  width: "100%",
  maxWidth: "380px",
  textAlign: "center",
  boxShadow:
    "0 0 25px rgba(0,0,0,0.4)",
};

const title = {
  color: "#fff",
  marginBottom: "10px",
};

const subtitle = {
  color: "#9ca3af",
  marginBottom: "25px",
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #374151",
  background: "#1f2937",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  background:
    "linear-gradient(135deg, #6366f1, #22d3ee)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const text = {
  color: "#d1d5db",
  marginTop: "18px",
};

const link = {
  color: "#22d3ee",
  cursor: "pointer",
  fontWeight: "bold",
};
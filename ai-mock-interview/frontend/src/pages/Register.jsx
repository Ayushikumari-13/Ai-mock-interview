import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ YOUR DEPLOYED BACKEND
  const API_URL =
    "https://ai-mock-interview-ny3i.onrender.com";

  const handleRegister = async () => {

    try {

      // ✅ VALIDATION
      if (!name || !email || !password) {
        alert("Please fill all fields ❌");
        return;
      }

      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      // ✅ SAFE RESPONSE
      const data = await res.json();

      console.log("REGISTER RESPONSE:", data);

      // ✅ ERROR
      if (!res.ok) {

        alert(
          data.message ||
          data.error ||
          "Register failed ❌"
        );

        return;
      }

      // ✅ SUCCESS
      alert("Registered Successfully ✅");

      // 🔥 CLEAR INPUTS
      setName("");
      setEmail("");
      setPassword("");

      // 👉 LOGIN PAGE
      navigate("/login");

    } catch (err) {

      console.error("REGISTER ERROR:", err);

      alert(
        "Backend not connected ❌"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          📝 Register
        </h1>

        <p style={subtitle}>
          Create your AI Mock Interview account
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={input}
        />

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

        {/* BUTTON */}
        <button
          style={button}
          onClick={handleRegister}
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>

        <p style={text}>

          Already have an account?{" "}

          <span
            style={link}
            onClick={() =>
              navigate("/login")
            }
          >
            Login
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
  background:
    "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  padding: "35px",
  borderRadius: "20px",
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
  color: "#cbd5e1",
  marginBottom: "25px",
  fontSize: "14px",
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #334155",
  background: "#111827",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const button = {
  width: "100%",
  padding: "14px",
  background:
    "linear-gradient(135deg, #6366f1, #22d3ee)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

const text = {
  marginTop: "18px",
  color: "#cbd5e1",
};

const link = {
  color: "#22d3ee",
  cursor: "pointer",
  fontWeight: "bold",
};
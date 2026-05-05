import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  const fullText = "Crack Your Dream Job 🚀";

  // ✨ TYPEWRITER
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // 📊 REAL COUNT
  useEffect(() => {
    fetch("http://localhost:5000/api/interview/history")
      .then(res => res.json())
      .then(data => setCount(data.length))
      .catch(() => setCount(0));
  }, []);

  // 🔊 VOICE
  useEffect(() => {
    const msg = new SpeechSynthesisUtterance(
      "Welcome to AI Mock Interview. Start your preparation now."
    );
    msg.lang = "en-IN";
    window.speechSynthesis.speak(msg);
  }, []);

  return (
    <div style={container}>

      {/* NAVBAR */}
      <div style={navbar}>
        <h2 style={logo} onClick={() => navigate("/")}>
          🤖 AI Mock
        </h2>

        <div style={navRight}>
          <button style={navBtn} onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button style={navBtn} onClick={() => navigate("/history")}>History</button>
          <button style={navBtn} onClick={() => navigate("/login")}>Login</button>
          <button style={primaryBtn} onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>

      {/* HERO */}
      <div style={hero}>

        {/* LEFT */}
        <div style={heroLeft}>
          <h1 style={title}>{text}</h1>

          <p style={subtitle}>
            Practice AI interviews, get feedback, and boost your confidence.
          </p>

          {/* 🔥 FIXED COUNT */}
          <h2 style={counter}>🚀 {count} Interviews Practiced</h2>

          <div style={{ marginTop: "25px" }}>
            <button style={primaryBtn} onClick={() => navigate("/select-role")}>
              Start Interview
            </button>

            <button style={outlineBtn} onClick={() => navigate("/history")}>
              View History
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div style={heroRight}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="AI"
            style={imgStyle}
          />
        </div>

      </div>

      {/* FEATURES */}
      <div style={features}>
        {[
          { title: "💬 Real Questions", path: "/interview" },
          { title: "🤖 AI Feedback", path: "/dashboard" },
          { title: "📊 Performance", path: "/history" }
        ].map((item, i) => (
          <div
            key={i}
            style={card}
            onClick={() => navigate(item.path)}   // 🔥 CLICK FIX
          >
            <h3>{item.title}</h3>
            <p style={{ color: "#aaa" }}>Explore now</p>
          </div>
        ))}
      </div>

    </div>
  );
}


// 🎨 STYLES

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "#fff",
  fontFamily: "Segoe UI"
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)"
};

const logo = {
  cursor: "pointer",
  fontWeight: "bold"
};

const navRight = {
  display: "flex",
  gap: "15px"
};

const navBtn = {
  background: "transparent",
  color: "#cbd5f5",
  border: "none",
  cursor: "pointer"
};

const hero = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "80px 60px"
};

const heroLeft = {
  maxWidth: "500px"
};

const heroRight = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end"   // 🔥 RIGHT FIX
};

const title = {
  fontSize: "48px",
  background: "linear-gradient(90deg, #6366f1, #22d3ee)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const subtitle = {
  marginTop: "15px",
  color: "#cbd5f5"
};

const counter = {
  marginTop: "20px",
  color: "#22d3ee"
};

const primaryBtn = {
  padding: "12px 22px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #6366f1, #22d3ee)",
  color: "#fff",
  cursor: "pointer",
  marginRight: "10px"
};

const outlineBtn = {
  padding: "12px 22px",
  borderRadius: "10px",
  border: "1px solid #6366f1",
  background: "transparent",
  color: "#6366f1",
  cursor: "pointer"
};

const features = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  padding: "40px"
};

const card = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "15px",
  width: "220px",
  textAlign: "center",
  cursor: "pointer"
};

const imgStyle = {
  width: "320px"
};


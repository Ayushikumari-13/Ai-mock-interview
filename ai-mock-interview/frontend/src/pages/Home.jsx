import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

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

  // 📊 COUNT
  useEffect(() => {
    fetch("http://localhost:5000/api/interview/history")
      .then(res => res.json())
      .then(data => setCount(data.length))
      .catch(() => setCount(0));
  }, []);

  // 📱 MOBILE
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🎙️ VOICE
  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(
      "Welcome to AI Mock Interview. Start your preparation now."
    );

    msg.lang = "en-IN";
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    if (!hasSpoken) {
      speak();
      setHasSpoken(true);
    }
  }, []);

  return (
    <div style={container} onClick={speak}>

      {/* NAVBAR */}
      <div style={{
        ...navbar,
        flexDirection: isMobile ? "column" : "row"
      }}>
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
      <div style={{
        ...hero,
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : "left"
      }}>

        <div style={heroLeft}>
          <h1 style={title}>{text}</h1>

          <p style={subtitle}>
            Practice AI interviews, get feedback, and boost your confidence.
          </p>

          <h2 style={counter}>
            🚀 {count} Interviews Practiced
          </h2>

          <button
            style={primaryBtn}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/select-role");
            }}
          >
            Start Interview
          </button>
        </div>

        <div style={heroRight}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="AI"
            onClick={(e) => {
              e.stopPropagation();
              speak();
            }}
            style={img}
          />
        </div>

      </div>

      {/* FEATURES */}
      <div style={{
        ...features,
        flexDirection: isMobile ? "column" : "row"
      }}>
        {[
          { title: "💬 Real Questions", path: "/interview" },
          { title: "🤖 AI Feedback", path: "/dashboard" },
          { title: "📊 Performance", path: "/history" }
        ].map((item, i) => (
          <div
            key={i}
            style={card}
            onClick={(e) => {
              e.stopPropagation();
              navigate(item.path);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <h3 style={{ fontSize: "18px" }}>{item.title}</h3>
            <p style={{ color: "#aaa", marginTop: "10px" }}>
              Click to explore
            </p>
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
  color: "#fff"
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px"
};

const logo = {
  cursor: "pointer"
};

const navRight = {
  display: "flex",
  gap: "10px"
};

const navBtn = {
  background: "transparent",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

const hero = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "40px"
};

const heroLeft = {
  maxWidth: "500px"
};

const heroRight = {
  display: "flex"
};

const title = {
  fontSize: "40px",
  color: "#22d3ee"
};

const subtitle = {
  color: "#aaa"
};

const counter = {
  marginTop: "10px",
  color: "#22d3ee"
};

const primaryBtn = {
  padding: "10px 20px",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  marginTop: "10px"
};

const features = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  padding: "60px",
  flexWrap: "wrap"
};

const card = {
  background: "rgba(255,255,255,0.08)",
  padding: "30px",
  borderRadius: "20px",
  width: "280px",
  textAlign: "center",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  transition: "0.3s"
};

const img = {
  width: "250px",
  cursor: "pointer"
};
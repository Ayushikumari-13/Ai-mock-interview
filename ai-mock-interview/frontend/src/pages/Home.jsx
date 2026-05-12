import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  const fullText = "Crack Your Dream Job 🚀";

  // ✅ DEPLOYED BACKEND
  const API_URL =
    "https://ai-mock-interview-ny3i.onrender.com";

  // ✨ TYPEWRITER
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setText(fullText.slice(0, i));

      i++;

      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // 📊 INTERVIEW COUNT
  useEffect(() => {
    fetch(`${API_URL}/api/interview/history`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.length || 0);
      })
      .catch((err) => {
        console.log(err);
        setCount(0);
      });
  }, []);

  // 📱 MOBILE RESPONSIVE
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);
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

  // 🔥 AUTO SPEAK ONCE
  useEffect(() => {
    if (!hasSpoken) {
      speak();
      setHasSpoken(true);
    }
  }, []);

  return (
    <div style={container}>

      {/* NAVBAR */}
      <div
        style={{
          ...navbar,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <h2
          style={logo}
          onClick={() => navigate("/")}
        >
          🤖 AI Mock
        </h2>

        <div style={navRight}>

          <button
            style={navBtn}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            style={navBtn}
            onClick={() => navigate("/history")}
          >
            History
          </button>

          <button
            style={navBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={primaryBtn}
            onClick={() => navigate("/register")}
          >
            Register
          </button>

        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          ...hero,
          flexDirection: isMobile ? "column" : "row",
          textAlign: isMobile ? "center" : "left",
        }}
      >

        {/* LEFT */}
        <div style={heroLeft}>

          <h1 style={title}>
            {text}
          </h1>

          <p style={subtitle}>
            Practice AI interviews,
            get feedback and boost your confidence.
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

        {/* RIGHT */}
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
      <div
        style={{
          ...features,
          flexDirection: isMobile ? "column" : "row",
        }}
      >

        {[
          {
            title: "💬 Real Questions",
            path: "/interview",
          },

          {
            title: "🤖 AI Feedback",
            path: "/dashboard",
          },

          {
            title: "📊 Performance",
            path: "/history",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={card}
            onClick={(e) => {
              e.stopPropagation();
              navigate(item.path);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
            }}
          >

            <h3 style={cardTitle}>
              {item.title}
            </h3>

            <p style={cardText}>
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
  background:
    "linear-gradient(135deg, #020617, #0f172a)",
  color: "#fff",
  overflowX: "hidden",
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 30px",
};

const logo = {
  cursor: "pointer",
  fontSize: "28px",
};

const navRight = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const navBtn = {
  background: "transparent",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
};

const hero = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "50px 30px",
  gap: "30px",
};

const heroLeft = {
  maxWidth: "550px",
};

const heroRight = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const title = {
  fontSize: "52px",
  fontWeight: "bold",
  color: "#22d3ee",
  lineHeight: "65px",
};

const subtitle = {
  color: "#cbd5e1",
  marginTop: "18px",
  fontSize: "18px",
  lineHeight: "30px",
};

const counter = {
  marginTop: "20px",
  color: "#22d3ee",
  fontSize: "24px",
};

const primaryBtn = {
  padding: "14px 28px",
  background:
    "linear-gradient(135deg, #6366f1, #22d3ee)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  marginTop: "20px",
  fontWeight: "bold",
  fontSize: "16px",
};

const features = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  padding: "60px 20px",
  flexWrap: "wrap",
};

const card = {
  background: "rgba(255,255,255,0.08)",
  padding: "35px",
  borderRadius: "22px",
  width: "280px",
  textAlign: "center",
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  transition: "0.3s",
};

const cardTitle = {
  fontSize: "22px",
};

const cardText = {
  color: "#cbd5e1",
  marginTop: "12px",
};

const img = {
  width: "280px",
  cursor: "pointer",
};
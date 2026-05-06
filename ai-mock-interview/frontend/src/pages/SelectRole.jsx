import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Frontend Developer",
      desc: "HTML, CSS, React, UI",
      icon: "🎨"
    },
    {
      title: "Backend Developer",
      desc: "Node.js, API, Database",
      icon: "⚙️"
    },
    {
      title: "Full Stack Developer",
      desc: "Frontend + Backend",
      icon: "🚀"
    }
  ];

  return (
    <div style={container}>
      <h1 style={title}>Select Interview Role 🚀</h1>

      <div style={grid}>
        {roles.map((role, i) => (
          <div
            key={i}
            style={card}
            onClick={() =>
              navigate("/interview", { state: { role: role.title } })
            }
          >
            <div style={icon}>{role.icon}</div>

            <h2 style={cardTitle}>{role.title}</h2>

            <p style={desc}>{role.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


// 🎨 STYLES

const container = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "#fff",
  padding: "20px"
};

const title = {
  fontSize: "36px",
  marginBottom: "50px",
  textAlign: "center",
  background: "linear-gradient(90deg, #6366f1, #22d3ee)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "30px",
  width: "100%",
  maxWidth: "900px"
};

const card = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(15px)",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 0 20px rgba(0,0,0,0.3)"
};

const icon = {
  fontSize: "40px",
  marginBottom: "15px"
};

const cardTitle = {
  fontSize: "22px",
  marginBottom: "10px"
};

const desc = {
  color: "#9ca3af",
  fontSize: "14px"
};
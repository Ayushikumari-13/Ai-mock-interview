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
      
      <div style={wrapper}>
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

              <h2>{role.title}</h2>

              <p style={{ color: "#aaa" }}>{role.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


// 🎨 STYLES

const container = {
  width: "100%",
  padding: "20px"
};

const wrapper = {
  maxWidth: "1000px",
  margin: "auto"
};

const title = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "28px"
};

const grid = {
  display: "flex",
  gap: "20px",
  justifyContent: "center",
  flexWrap: "wrap"
};

const card = {
  width: "260px",
  height: "170px",
  background: "#111827",
  borderRadius: "15px",
  padding: "20px",
  cursor: "pointer",
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)"
};

const icon = {
  fontSize: "28px",
  marginBottom: "10px"
};
import React, { useEffect, useState } from "react";

const History = () => {
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/interview/history")
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      padding: "20px",
      maxWidth: "900px",
      margin: "auto",
      background: "#0b1220",
      minHeight: "100vh",
      color: "#fff"
    }}>
      <h2 style={{ textAlign: "center" }}>📜 Interview History</h2>

      {data.length === 0 && (
        <p style={{ textAlign: "center" }}>No history found ❌</p>
      )}

      {data.map((item, i) => (
        <div key={i} style={card}>

          {/* 🔥 TOP INFO */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3>💼 {item.role}</h3>
              <p>Score: {item.totalScore}</p>
              <p>Percentage: {item.percentage}%</p>
            </div>

            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={btn}
            >
              {openIndex === i ? "Hide" : "View"}
            </button>
          </div>

          {/* 📅 DATE */}
          <p style={{ fontSize: "12px", color: "#aaa" }}>
            {item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : "N/A"}
          </p>

          {/* 🔥 DETAILS */}
          {openIndex === i && (
            <div style={{ marginTop: "15px" }}>
              <h4>📊 Detailed Analysis:</h4>

              {item.questions?.map((q, index) => (
                <div key={index} style={detailCard}>
                  <p><b>Q:</b> {q}</p>
                  <p><b>Your Answer:</b> {item.answers[index]}</p>

                  <p style={{ color: "#2563eb" }}>
                    💡 {item.feedbacks[index]}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      ))}
    </div>
  );
};


// 🔥 STYLES

const card = {
  background: "linear-gradient(135deg, #111827, #1f2937)",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "15px",
  boxShadow: "0 0 15px rgba(0,0,0,0.4)"
};

const detailCard = {
  background: "#fff",
  color: "#000",
  padding: "10px",
  borderRadius: "10px",
  marginTop: "10px"
};

const btn = {
  padding: "8px 15px",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default History;
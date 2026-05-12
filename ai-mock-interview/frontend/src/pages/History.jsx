import React, { useEffect, useState } from "react";

const History = () => {

  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ DEPLOYED BACKEND
  const API_URL =
    "https://ai-mock-interview-ny3i.onrender.com";

  useEffect(() => {

    fetch(`${API_URL}/api/interview/history`)
      .then((res) => res.json())

      .then((resData) => {

        console.log("HISTORY DATA:", resData);

        // ✅ SAFE ARRAY CHECK
        if (Array.isArray(resData)) {
          setData(resData.reverse());
        } else {
          setData([]);
        }

        setLoading(false);
      })

      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "950px",
        margin: "auto",
        background:
          "linear-gradient(135deg, #020617, #0f172a)",
        minHeight: "100vh",
        color: "#fff",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        📜 Interview History
      </h1>

      {/* 🔄 LOADING */}
      {loading && (
        <p style={{ textAlign: "center" }}>
          Loading history...
        </p>
      )}

      {/* ❌ EMPTY */}
      {!loading && data.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            fontSize: "18px",
          }}
        >
          No history found ❌
        </p>
      )}

      {/* ✅ HISTORY */}
      {data.map((item, i) => (

        <div key={i} style={card}>

          {/* TOP */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >

            <div>

              <h2 style={{ marginBottom: "10px" }}>
                💼 {item.role || "Frontend Developer"}
              </h2>

              <p>
                🎯 Score:
                {" "}
                {item.totalScore || 0}
              </p>

              <p>
                📊 Percentage:
                {" "}
                {item.percentage || 0}%
              </p>

            </div>

            <button
              onClick={() =>
                setOpenIndex(
                  openIndex === i ? null : i
                )
              }
              style={btn}
            >
              {openIndex === i
                ? "Hide"
                : "View"}
            </button>

          </div>

          {/* DATE */}
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              marginTop: "10px",
            }}
          >
            📅
            {" "}
            {item.createdAt
              ? new Date(
                  item.createdAt
                ).toLocaleString()
              : "No Date"}
          </p>

          {/* DETAILS */}
          {openIndex === i && (

            <div style={{ marginTop: "20px" }}>

              <h3>
                📊 Detailed Analysis
              </h3>

              {item.questions?.map(
                (q, index) => (

                  <div
                    key={index}
                    style={detailCard}
                  >

                    <p>
                      <b>Q:</b> {q}
                    </p>

                    <p>
                      <b>Your Answer:</b>
                      {" "}
                      {item.answers?.[index] ||
                        "No answer"}
                    </p>

                    <p
                      style={{
                        color: "#2563eb",
                        marginTop: "10px",
                      }}
                    >
                      💡
                      {" "}
                      {item.feedbacks?.[index] ||
                        "Good Answer"}
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </div>
      ))}
    </div>
  );
};

// 🎨 STYLES

const card = {
  background:
    "linear-gradient(135deg, #111827, #1e293b)",
  padding: "25px",
  borderRadius: "18px",
  marginBottom: "20px",
  boxShadow:
    "0 0 20px rgba(0,0,0,0.35)",
};

const detailCard = {
  background: "#ffffff",
  color: "#111827",
  padding: "15px",
  borderRadius: "12px",
  marginTop: "15px",
};

const btn = {
  padding: "10px 18px",
  background:
    "linear-gradient(135deg, #6366f1, #22d3ee)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default History;
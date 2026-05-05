import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();   // ✅ ADD

  useEffect(() => {
    fetch("http://localhost:5000/api/interview/history")
      .then(res => res.json())
      .then(resData => setData(resData));
  }, []);

  // 🎯 STATS
  const totalInterviews = data.length;

  const avgScore = data.length
    ? (
        data.reduce((sum, item) => sum + (item.percentage || 0), 0) /
        data.length
      ).toFixed(1)
    : 0;

  const roles = [...new Set(data.map(item => item.role))];

  // 📊 GRAPH DATA
  const chartData = data.map((item, i) => ({
    name: `Test ${i + 1}`,
    score: item.totalScore || 0
  }));

  return (
    <div style={{
      padding: "20px",
      color: "#fff"
    }}>
      <h2 style={{ marginBottom: "20px" }}>📊 Dashboard</h2>

      {/* 🔥 CARDS */}
      <div style={cardContainer}>

        {/* ✅ CARD 1 */}
        <div
          style={cardStyle}
          onClick={() => navigate("/history")}
        >
          <h1>{totalInterviews}</h1>
          <p>Interviews Taken</p>
        </div>

        {/* ✅ CARD 2 */}
        <div
          style={cardStyle}
          onClick={() => navigate("/dashboard")}
        >
          <h1>{avgScore}%</h1>
          <p>Average Score</p>
        </div>

        {/* ✅ CARD 3 */}
        <div
          style={cardStyle}
          onClick={() => navigate("/interview")}
        >
          <h1>{roles.length}</h1>
          <p>Roles Practiced</p>
        </div>

      </div>

      {/* 📊 GRAPH */}
      <h3 style={{ marginTop: "30px" }}>📈 Performance Trend</h3>

      <div style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px"
      }}>
        <LineChart width={500} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      </div>

      {/* 📜 RECENT */}
      <h3 style={{ marginTop: "30px" }}>📜 Recent Interviews</h3>

      {data.slice(0, 5).map((item, i) => (
        <div key={i} style={recentCard}>
          <h4>{item.role}</h4>

          <p>Score: {item.totalScore}</p>
          <p>Percentage: {item.percentage}%</p>

          <p>
            Date: {item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
};


// 🔥 STYLES

const cardContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const cardStyle = {
  flex: "1",
  minWidth: "200px",
  background: "linear-gradient(135deg, #6366f1, #22d3ee)",
  padding: "20px",
  borderRadius: "15px",
  textAlign: "center",
  color: "#fff",
  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  transition: "0.3s",
  cursor: "pointer"
};

const recentCard = {
  background: "#111827",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "10px",
  transition: "0.3s"
};

export default Dashboard;
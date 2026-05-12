import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Interview = () => {
  const location = useLocation();

  const [role, setRole] = useState("Frontend Developer");
  const [interviewId, setInterviewId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [videoOn, setVideoOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);

  // ✅ BACKEND URL
  const API_URL =
    "https://ai-mock-interview-ny3i.onrender.com";

  // 🔥 ROLE FROM SELECT PAGE
  useEffect(() => {
    if (location.state?.role) {
      setRole(location.state.role);
    }
  }, [location.state]);

  // 🎙️ VOICE INPUT
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported ❌");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
    };

    recognition.start();
  };

  // 🎥 CAMERA
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setVideoOn(true);

    } catch {
      alert("Camera permission denied ❌");
    }
  };

  // 🚀 START INTERVIEW
  const startInterview = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/interview/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );

      const data = await res.json();

      console.log("🔥 START RESPONSE:", data);

      // ✅ FIX
      if (!data || !data.question) {
        alert("❌ Question not received from backend");
        return;
      }

      setInterviewId(data.interviewId);

      // ✅ QUESTION FIX
      setQuestion(String(data.question));

    } catch (err) {
      console.error(err);
      alert("❌ Backend not connected");
    } finally {
      setLoading(false);
    }
  };

  // ➡ NEXT QUESTION
  const handleNext = async () => {
    if (!answer.trim()) {
      alert("Write answer first ❌");
      return;
    }

    const updated = [...answers];

    updated[currentIndex] = answer;

    setAnswers(updated);

    try {
      const res = await fetch(
        `${API_URL}/api/interview/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            interviewId,
            message: answer,
          }),
        }
      );

      const data = await res.json();

      console.log("🔥 NEXT RESPONSE:", data);

      setAnswer("");

      // ✅ INTERVIEW FINISHED
      if (data.completed) {
        setResult(data);
        return;
      }

      // ✅ NEXT QUESTION FIX
      setQuestion(String(data.nextQuestion));

      setCurrentIndex((prev) => prev + 1);

    } catch (err) {
      console.log(err);
      alert("❌ Server error");
    }
  };

  // ⬅ BACK
  const handleBack = () => {
    if (currentIndex === 0) return;

    const prev = currentIndex - 1;

    setCurrentIndex(prev);

    setAnswer(answers[prev] || "");
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/interview/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            interviewId,
            message: answer,
          }),
        }
      );

      const data = await res.json();

      setResult(data);

    } catch {
      alert("Submit failed ❌");
    }
  };

  return (
    <div style={container}>

      {/* START SCREEN */}
      {!interviewId && (
        <div style={card}>
          <h1 style={title}>🤖 AI Interview</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={select}
          >
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
          </select>

          <button
            style={button}
            onClick={startInterview}
          >
            {loading ? "Starting..." : "🚀 Start Interview"}
          </button>
        </div>
      )}

      {/* QUESTION SCREEN */}
      {interviewId && !result && (
        <div style={questionCard}>

          {/* AI IMAGE */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="AI"
            style={{
              width: "80px",
              marginBottom: "15px",
            }}
          />

          <h2 style={questionTitle}>
            Question {currentIndex + 1}
          </h2>

          {/* ✅ QUESTION BOX */}
          <div style={questionBox}>
            {question || "Loading question..."}
          </div>

          {/* ANSWER */}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer..."
            style={textarea}
          />

          {/* BUTTONS */}
          <div style={btnRow}>
            <button
              style={btn}
              onClick={startVoice}
            >
              🎙️ Speak
            </button>

            <button
              style={btn}
              onClick={startCamera}
            >
              🎥 Camera
            </button>
          </div>

          {/* VIDEO */}
          {videoOn && (
            <video
              ref={videoRef}
              autoPlay
              style={videoStyle}
            />
          )}

          {/* ACTION BUTTONS */}
          <div style={btnRow}>

            <button
              style={btn}
              onClick={handleBack}
            >
              ⬅ Back
            </button>

            <button
              style={btn}
              onClick={handleNext}
            >
              Next ➡
            </button>

            <button
              style={btn}
              onClick={handleSubmit}
            >
              Submit ✅
            </button>

          </div>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div style={resultCard}>
          <h2>🎯 Result</h2>

          <h3>{result.performance}</h3>

          <p>Score: {result.totalScore}</p>

          <p>{result.percentage}%</p>
        </div>
      )}
    </div>
  );
};

// 🎨 STYLES

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(135deg, #0b1220, #1e293b)",
  padding: "20px",
};

const card = {
  padding: "30px",
  borderRadius: "15px",
  background: "#111827",
  textAlign: "center",
  width: "100%",
  maxWidth: "350px",
};

const title = {
  color: "#fff",
};

const select = {
  width: "100%",
  padding: "12px",
  margin: "15px 0",
  borderRadius: "8px",
};

const button = {
  width: "100%",
  padding: "12px",
  background:
    "linear-gradient(135deg, #6366f1, #22d3ee)",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const questionCard = {
  background: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "550px",
  boxShadow: "0 0 25px rgba(0,0,0,0.3)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const questionTitle = {
  color: "#111827",
  marginBottom: "10px",
};

const questionBox = {
  width: "100%",
  background: "#e5e7eb",
  padding: "15px",
  borderRadius: "10px",
  color: "#111827",
  fontWeight: "700",
  fontSize: "18px",
  marginTop: "10px",
  marginBottom: "15px",
  lineHeight: "28px",
};

const textarea = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  color: "#111827",
  background: "#fff",
  fontSize: "15px",
  minHeight: "120px",
  boxSizing: "border-box",
};

const btnRow = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const btn = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background:
    "linear-gradient(135deg, #6366f1, #22d3ee)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
};

const videoStyle = {
  width: "140px",
  marginTop: "15px",
  borderRadius: "10px",
};

const resultCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  width: "100%",
  maxWidth: "500px",
  textAlign: "center",
};

export default Interview;
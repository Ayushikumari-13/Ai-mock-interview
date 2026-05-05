import React, { useState } from "react";

const Interview = () => {
  const [role, setRole] = useState("Frontend Developer");
  const [interviewId, setInterviewId] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [videoOn, setVideoOn] = useState(false);

  // 🎙️ VOICE INPUT
  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
    };

    recognition.start();
  };

  // 🎥 CAMERA
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.getElementById("video");
    video.srcObject = stream;
    setVideoOn(true);
  };

  // 🚀 START
  const startInterview = async () => {
    const res = await fetch("http://localhost:5000/api/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role })
    });

    const data = await res.json();

    setInterviewId(data.interviewId);
    setQuestion(data.question || "⚠️ Question not received");
    setCurrentIndex(0);
    setAnswers([]);
    setAnswer("");
  };

  // ➡ NEXT
  const handleNext = async () => {
    if (!answer.trim()) {
      alert("please write an  answer");
      return;
    }

    const updated = [...answers];
    updated[currentIndex] = answer;
    setAnswers(updated);

    const res = await fetch("http://localhost:5000/api/interview/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interviewId, message: answer })
    });

    const data = await res.json();
    setAnswer("");

    if (data.completed) {
      setResult(data);
      return;
    }

    setQuestion(data.nextQuestion || "⚠️ Question not coming");
    setCurrentIndex(prev => prev + 1);
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
    const res = await fetch("http://localhost:5000/api/interview/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interviewId, message: answer })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={container}>

      {/* 🔥 START SCREEN */}
      {!interviewId && (
        <div style={card}>
          <h1 style={title}>🤖 AI Mock Interview</h1>

          <p style={subtitle}>
            Practice interviews with AI & boost your confidence 🚀
          </p>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={select}
          >
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
          </select>

          <button style={button} onClick={startInterview}>
            🚀 Start Interview
          </button>
        </div>
      )}

      {/* QUESTION */}
      {interviewId && !result && (
        <div style={questionCard}>

          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="AI"
            style={{ width: "80px", marginBottom: "10px" }}
          />

          <h3>Question {currentIndex + 1}</h3>

          <p><b>{question}</b></p>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows="4"
            style={textarea}
          />

          <div style={{ marginTop: "10px" }}>
            <button onClick={startVoice}>🎙️ Speak</button>
            <button onClick={startCamera} style={{ marginLeft: "10px" }}>
              🎥 Camera
            </button>
          </div>

          {videoOn && (
            <video id="video" autoPlay style={{ width: "150px", marginTop: "10px" }} />
          )}

          <div style={{ marginTop: "15px" }}>
            <button onClick={handleBack} disabled={currentIndex === 0}>
              ⬅ Back
            </button>

            <button onClick={handleNext} style={{ marginLeft: "10px" }}>
              Next ➡
            </button>

            <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
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
          <p>Percentage: {result.percentage}%</p>

          {result.questions?.map((q, i) => (
            <div key={i}>
              <p><b>Q{i + 1}:</b> {q}</p>
              <p><b>Ans:</b> {result.answers[i]}</p>
              <p style={{ color: "blue" }}>💡 {result.feedbacks[i]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 🎨 STYLES

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0b1220, #1e293b)"
};

const card = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(15px)",
  padding: "40px",
  borderRadius: "20px",
  textAlign: "center",
  width: "350px"
};

const title = { color: "#fff" };

const subtitle = {
  color: "#aaa",
  fontSize: "14px",
  marginBottom: "20px"
};

const select = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  marginBottom: "20px",
  background: "#111827",
  color: "#fff"
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #6366f1, #22d3ee)",
  color: "#fff",
  cursor: "pointer"
};

const questionCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  color: "#000",
  width: "500px"
};

const textarea = {
  width: "100%",
  marginTop: "10px",
  padding: "10px"
};

const resultCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  color: "#000",
  width: "500px"
};
export default Interview;
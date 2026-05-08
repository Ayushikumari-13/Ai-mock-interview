import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Temp";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SelectRole from "./pages/SelectRole";

import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 HOME (NO SIDEBAR) */}
        <Route path="/" element={<Home />} />

        {/* 🔥 ALL PAGES WITH SIDEBAR */}
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/history" element={<History />} />
          <Route path="/select-role" element={<SelectRole />} />

        </Route>

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ❌ 404 PAGE FIX */}
        <Route path="*" element={<h1 style={{color:"#fff",textAlign:"center"}}>Page Not Found ❌</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
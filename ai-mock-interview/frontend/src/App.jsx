import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Layout from "./components/Layout";
import SelectRole from "./pages/SelectRole";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 HOME (NO SIDEBAR) */}
        <Route path="/" element={<Home />} />

        {/* 🔥 ALL MAIN PAGES WITH SIDEBAR */}
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/history" element={<History />} />

          {/* 🔥 FIX: ROLE SELECT ALSO INSIDE LAYOUT */}
          <Route path="/select-role" element={<SelectRole />} />

        </Route>

        {/* 🔐 AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
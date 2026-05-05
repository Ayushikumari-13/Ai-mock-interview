import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={container}>

      {/* SIDEBAR */}
      <aside style={sidebarWrapper}>
        <Sidebar />
      </aside>

      {/* CONTENT */}
      <main style={content}>
        <Outlet />
      </main>

    </div>
  );
}


// 🎨 STYLES

const container = {
  display: "flex",
  height: "100vh",          // 🔥 FULL FIXED HEIGHT
  overflow: "hidden",       // 🔥 IMPORTANT (no glitch)
  background: "#0b1220"
};

const sidebarWrapper = {
  width: "220px",
  flexShrink: 0,
  background: "#020617",
  borderRight: "1px solid rgba(255,255,255,0.1)"
};

const content = {
  flex: 1,
  padding: "20px",
  color: "#fff",
  overflowY: "auto",        // 🔥 ONLY content scroll
  boxSizing: "border-box"
};
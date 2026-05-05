export default function MessageBubble({ text, type }) {
  return (
    <div style={{
      background: type === "user" ? "#2563eb" : "#374151",
      padding: "10px",
      margin: "10px",
      borderRadius: "10px"
    }}>
      {text}
    </div>
  );
}
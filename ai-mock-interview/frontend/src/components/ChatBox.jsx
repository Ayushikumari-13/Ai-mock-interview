import MessageBubble from "./MessageBubble";

export default function ChatBox({ messages }) {
  return (
    <div>
      {messages.map((msg, i) => (
        <MessageBubble key={i} text={msg.text} type={msg.type} />
      ))}
    </div>
  );
}
import React, { useEffect, useRef } from "react";
import "../css/ChatRoom.css";

const ChatRoom = ({
  user1,
  name,
  messages,
  message,
  setMessage,
  sendMessage,
  typingUser,
  onTyping,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with {name}</div>

      <div className="chat-messages">
        {messages.map((m, index) => (
          <div
            key={index}
            className={
              m.senderId === user1
                ? "message-row right"
                : "message-row left"
            }
          >
            <div className="message-bubble">
              {m.msg}
              <span className="time">{new Date(m.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}</span>
            </div>

          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>



      <div className="typing">{typingUser}</div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={onTyping}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;

import React, { useEffect, useRef, useState } from "react";
import "../css/ChatRoom.css";
const ChatRoom = ({ connection ,user1, user2 }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [time,setTime] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const messagesEndRef = useRef(null);

  // Unique room id
  const roomId =
    user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);


  // Start connection
  useEffect(() => {
  if (!connection) return;

  connection.on("LoadOldMessages", (msgs) => {
  const formatted = msgs.map(m => ({
    senderId: m.senderId,
    msg: m.message,
    time: m.time
  }));

  setMessages(formatted);
});



  connection.on("ReceiveMessage", (senderId, msg, time) => {
    setMessages((prev) => [...prev, { senderId, msg ,time}]);
    setTime(time);
  });
  
  connection.on("UserTyping", (userId) => {
    if (userId !== user1) {
      setTypingUser("Typing...");
      setTimeout(() => setTypingUser(""), 1500);
    }
  });

  return async () => {
    connection.off("ReceiveMessage");
    connection.off("UserTyping");
    connection.off("LoadOldMessages");
  };
}, [connection]);

  // Send message
const sendMessage = async () => {
  if (!message.trim()) return;
  await connection.invoke("SendMessage", roomId, user1, message);
  setMessage("");
};

  // Handle typing
  const handleTyping = async () => {
    await connection.invoke("Typing", roomId, user1);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>

      <div className="chat-messages">
        {messages.map((m, index) => (
          <div
            key={index}
            className={
              m.senderId === user1
                ? "message my-message"
                : "message other-message"
            }
          >
            {m.msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="typing">{typingUser}</div>

      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={handleTyping}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;

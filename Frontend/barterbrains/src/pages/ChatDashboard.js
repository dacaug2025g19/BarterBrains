import React, { useEffect, useState } from "react";
import createConnection from "../components/createConnection";
import ChatRoom from "./ChatRoom";
import { useSelector } from "react-redux";
import { getAcceptedChatRequests } from "../api/authApi";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";
import "../css/ChatDashboard.css";
import { useRef } from "react";

const ChatDashboard = () => {
  const loggedUser = useSelector((state) => state.auth.user);

  const [senders, setSenders] = useState([]);
  const connRef = useRef(null);
  const [chatUser, setChatUser] = useState(null);

  // 🔴 CHAT STATES HERE
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [chatUserName, setChatUserName] = useState("");


  // Load accepted chats
  useEffect(() => {
    if (loggedUser?.uid) {
      getAcceptedChatRequests(loggedUser.uid)
        .then((res) => setSenders(res.data))
        .catch((err) => console.error(err));
    }
  }, [loggedUser]);

  const startChat = async (otherUid, otherName) => {
  const uid = loggedUser.uid;
  setChatUserName(otherName);

  const roomId =
    uid < otherUid ? `${uid}_${otherUid}` : `${otherUid}_${uid}`;

  // 🛑 STOP OLD CONNECTION FIRST
  if (connRef.current) {
    await connRef.current.stop();
    connRef.current = null;
  }

  const connection = createConnection();
  connRef.current = connection;

  // ✅ LISTENERS
  connection.on("LoadOldMessages", (msgs) => {
    setMessages(
      msgs.map((m) => ({
        senderId: m.senderId,
        msg: m.message,
        time: m.time,
      }))
    );
  });

  connection.on("ReceiveMessage", (senderId, msg, time) => {
    setMessages((prev) => [...prev, { senderId, msg, time }]);
  });

  connection.on("UserTyping", (userId) => {
    if (userId !== uid) {
      setTypingUser("Typing...");
      setTimeout(() => setTypingUser(""), 1500);
    }
  });

  await connection.start();
  await connection.invoke("JoinRoom", roomId);

  setChatUser(otherUid);
};


  // ✅ Send message
  const handleSend = async () => {
    if (!message.trim()) return;

    const uid = loggedUser.uid;
    const roomId =
      uid < chatUser ? `${uid}_${chatUser}` : `${chatUser}_${uid}`;

    await connRef.current.invoke("SendMessage", roomId, uid, message);
    setMessage("");
  };

  // ✅ Typing
  const handleTyping = async () => {
    const uid = loggedUser.uid;
    const roomId =
      uid < chatUser ? `${uid}_${chatUser}` : `${chatUser}_${uid}`;

    await connRef.current.invoke("Typing", roomId, uid);
  };


 useEffect(() => {
  return () => {
    if (connRef.current) {
      connRef.current.stop();
      connRef.current = null;
    }
  };
}, []);

  return (
    <>
      <UserNavbar />

      <div style={{ display: "flex" }}>
        <UserSidebar />

        <div style={{ flex: 1 }}>
          {!chatUser ? (
            <div className="chat-container">
              <h2 className="chat-title">Accepted Chats</h2>

              {senders.map((sender) => (
                <div key={sender.senderId} className="chat-row">
                  <span className="sender-name">
                    {sender.senderName}
                  </span>

                  <button
                    className="start-chat-btn"
                    onClick={() => startChat(sender.senderId, sender.senderName)}
                  >
                    Start Chat
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <ChatRoom
              user1={loggedUser.uid}
              user2={chatUser}
              name={chatUserName}
              messages={messages}
              message={message}
              setMessage={setMessage}
              sendMessage={handleSend}
              typingUser={typingUser}
              onTyping={handleTyping}
            />

          )}
        </div>
      </div>
    </>
  );
};

export default ChatDashboard;
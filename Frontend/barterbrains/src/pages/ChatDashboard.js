import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAcceptedChatRequests } from "../api/authApi";
import "../css/ChatDashboard.css";

/* ✅ ADD THESE TWO IMPORTS */
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

const ChatDashboard = () => {
  const loggedUser = useSelector((state) => state.auth.user);

  const [senders, setSenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedUser?.uid) {
      getAcceptedChatRequests(loggedUser.uid)
        .then((res) => {
          setSenders(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [loggedUser]);

  const handleStartChat = (senderId) => {
    console.log("Start chat with senderId:", senderId);
  };

  if (loading) return <p className="loading-text">Loading chats...</p>;

  return (
    <>
      {/* 🔹 TOP NAVBAR */}
      <UserNavbar />

      {/* 🔹 SIDEBAR + PAGE CONTENT */}
      <div style={{ display: "flex" }}>
        <UserSidebar />

        <div style={{ flex: 1 }}>
          <div className="chat-container">
            <h2 className="chat-title">Accepted Chats</h2>

            {senders.length === 0 && (
              <p className="empty-text">
                No accepted chat requests yet.
              </p>
            )}

            {senders.map((sender) => (
              <div key={sender.senderId} className="chat-row">
                <span className="sender-name">
                  {sender.senderName}
                </span>

                <button
                  className="start-chat-btn"
                  onClick={() => handleStartChat(sender.senderId)}
                >
                  Start Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDashboard;

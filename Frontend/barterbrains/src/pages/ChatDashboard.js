import React, { useEffect, useState } from "react";
import createConnection from "../components/createConnection";
import ChatRoom from "./ChatRoom";
import { useSelector } from "react-redux";
import { getAcceptedChatRequests } from "../api/authApi";
import "../css/ChatDashboard.css";
import UserNavbar from "../components/UserNavbar";
import UserSidebar from "../components/UserSidebar";

const ChatDashboard = () => {
  const loggedUser = useSelector((state) => state.auth.user);

  const [senders, setSenders] = useState([]);
  const [conn, setConn] = useState(null);
  const [chatUser, setChatUser] = useState(null); // 👈 who we chat with

  useEffect(() => {
    if (loggedUser?.uid) {
      getAcceptedChatRequests(loggedUser.uid)
        .then((res) => setSenders(res.data))
        .catch((err) => console.error(err));
    }
  }, [loggedUser]);

  // ✅ Start chat when button clicked
  const startChat = async (otherUid) => {
    const uid = loggedUser.uid;

    const roomId =
      uid < otherUid ? `${uid}_${otherUid}` : `${otherUid}_${uid}`;

    const connection = createConnection();
    await connection.start();
    await connection.invoke("JoinRoom", roomId);

    setConn(connection);
    setChatUser(otherUid); // 👈 important
  };

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
                    onClick={() => startChat(sender.senderId)}
                  >
                    Start Chat
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <ChatRoom
              connection={conn}
              user1={loggedUser.uid}
              user2={chatUser}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatDashboard;
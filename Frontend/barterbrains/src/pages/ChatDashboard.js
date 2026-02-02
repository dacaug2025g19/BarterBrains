import React, { useState } from "react";
import createConnection from "../components/createConnection";
import ChatRoom from "./ChatRoom";


const ChatDashboard = () => {

    const [conn, setConn] = useState(null);
    const [start, setStart] = useState(false);

    const uid = 9;
    const otherUid = 8;

    const startChat = async () => {
        const roomId =
            uid < otherUid ? `${uid}_${otherUid}` : `${otherUid}_${uid}`;
         console.log("Room ID:", roomId);
        const connection = createConnection();
        await connection.start();
       
        await connection.invoke("JoinRoom", roomId);

        setConn(connection);
        setStart(true);
    };


    return (
         <>
      {!start ? (
        <button onClick={startChat}>Start Chat</button>
      ) : (
        <ChatRoom
          connection={conn}
          user1={uid}
          user2={otherUid}
        />
      )}
    </>
    )
}

export default ChatDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "../css/UserNavbar.css";
import { useSelector } from "react-redux";
import { FetchNotifications, RejectRequestapi, AcceptRequestapi } from "../api/authApi";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  const uid = useSelector((state) => state.auth.user?.uid);

  const user = useSelector((state) => state.auth.user);

  const handleAccept = async (rid) => {
  await AcceptRequestapi(rid);

  setNotifications((prev) =>
    prev.filter((n) => n.request_id !== rid)
  );
};


  const handleReject = async (rid) => {
    await RejectRequestapi(rid);

    setNotifications((prev) =>
      prev.filter((n) => n.request_id !== rid)
    );

  }

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await FetchNotifications(uid);
        console.log("Notification data:", res.data);
        setNotifications(res.data);
        //if any pending request exists → show dot
        const anyPending = res.data.some(n => n.status === "PENDING");
        setHasUnread(anyPending);
      } catch (err) {
        console.error(err);
      }
    };

    loadNotifications();
  }, [uid]);


  const timeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    console.log("Now:", now, "Past:", past);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };



  return (
    <nav className="navbar">
      <h4 className="logo" onClick={() => navigate("/")}>
        BarterBrains
      </h4>

      {/* Right Side */}
      <div className="right-section">

        {/* Notification */}
        <div className="notif-wrapper">
          <div
            className="bell-container"
            onClick={() => {
              setShowNotif(!showNotif);
              setHasUnread(false);
            }}
          >
            <FaBell className="bell-icon" />
            {hasUnread && <span className="notif-dot"></span>}
          </div>

          {showNotif && (
            <div className="notif-dropdown">
              <h5>Notifications</h5>

              {notifications?.length === 0 ? (
                <p className="muted">No new notifications</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.request_id} className="notif-item">
                    <div className="notif-text">
                      <strong>{n.sender_name}</strong> sent you a request
                      <div className="time">{timeAgo(n.timestamp)}</div>
                    </div>

                    {n.status === "PENDING" && (
                      <div className="notif-actions">
                        <button
                          className="accept-btn"
                          onClick={() => handleAccept(n.request_id)}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleReject(n.request_id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Username */}
        <div className="username-pill">
          {user?.uname}
        </div>

      </div>
    </nav>

  );
};

export default UserNavbar;

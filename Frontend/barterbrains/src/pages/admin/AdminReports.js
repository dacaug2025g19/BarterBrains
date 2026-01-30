import React, { useEffect, useState } from "react";
import { getSessions, getBookings } from "../../api/adminApi";
import "../../css/admin.css";
import AdminLayout from "../../components/admin/AdminLayout";





const AdminReports = () => {
  const [sessions, setSessions] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getSessions().then(res => setSessions(res.data));
    getBookings().then(res => setBookings(res.data));
  }, []);

  return (
  <AdminLayout>
    {/* page UI */}
    <div className="admin-container">
      <h2>Reports</h2>

      <div className="admin-card">
        <h4>Sessions</h4>
        {sessions.map(s => <p key={s.seid}>{s.mode}</p>)}
      </div>

      <div className="admin-card">
        <h4>Bookings</h4>
        {bookings.map(b => <p key={b.bsid}>{b.feedback}</p>)}
      </div>
    </div>
  </AdminLayout>
  );
};

export default AdminReports;

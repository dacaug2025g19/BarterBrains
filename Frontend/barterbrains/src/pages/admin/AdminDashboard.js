import React, { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../css/admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminDashboard().then(res => setStats(res.data));
  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        <h3>Loading...</h3>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-container">
        <h2>Admin Dashboard</h2>

        <div className="admin-card">
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Skills: {stats.totalSkills}</p>
          <p>Total Categories: {stats.totalCategories}</p>
          <p>Total Sessions: {stats.totalSessions}</p>
          <p>Total Bookings: {stats.totalBookings}</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

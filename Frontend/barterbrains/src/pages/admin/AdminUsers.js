import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../api/adminApi";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../css/admin.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    getAllUsers().then(res => setUsers(res.data));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Disable this user?")) return;
    deleteUser(id).then(loadUsers);
  };

  return (
    <AdminLayout>
      <div className="admin-container">
        <h2>Manage Users</h2>

        {/* USERS LIST */}
        <div className="user-card-list">
          {users.length === 0 && (
            <p className="admin-empty">No users found</p>
          )}

          {users.map(user => (
            <div className="user-card" key={user.uid}>
              <div className="user-info">
                <span className="user-name">{user.uname}</span>
                <span className="user-email">{user.email}</span>
                <span className="user-role">{user.role}</span>
              </div>

              <div className="user-actions">
                <button
                  className="admin-btn danger"
                  onClick={() => handleDelete(user.uid)}
                >
                  Disable
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;

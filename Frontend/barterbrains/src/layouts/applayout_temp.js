import React from "react";
import Navbar from "../components/Navbar";


const AppLayout = ({ children }) => {
  return (
    <div className="bg-dark text-light min-vh-100">
      
<Navbar/>
      <main className="container py-5">
        {children}
      </main>

      <footer className="text-center py-3 border-top border-secondary">
        © 2026 BarterBrain. All rights reserved.
      </footer>
    </div>
  );
};

export default AppLayout;
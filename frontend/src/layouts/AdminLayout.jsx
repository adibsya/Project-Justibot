import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/AdminFooter'
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
    <div className="flex text-onSurface bg-surface">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Dashboard;

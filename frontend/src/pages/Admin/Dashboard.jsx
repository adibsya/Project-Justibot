import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Dashboard/Sidebar';
import Navbar from '../../components/Admin/Dashboard/Navbar';
import QuickLinks from '../../components/Admin/Dashboard/QuickLink';
import Statistics from '../../components/Admin/Dashboard/Statistic';
import Chart from '../../components/Admin/Dashboard/Chart';
import Footer from '../../components/Admin/Dashboard/Footer';
import { div } from 'framer-motion/client';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
    <div className="flex text-onSurface bg-surface">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-6 flex">
          <div className="flex-1">
            <Statistics />
            <Chart />
          </div>
          <div className="w-72 ml-6">
            <QuickLinks />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Dashboard;

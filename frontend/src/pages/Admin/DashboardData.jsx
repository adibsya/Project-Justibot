import React, { useState } from "react";
import QuickLinks from "../../components/Admin/Dashboard/QuickLink";
import Statistics from "../../components/Admin/Dashboard/Statistic";
import Chart from "../../components/Admin/Dashboard/Chart";
import { div } from "framer-motion/client";

const DashboardData = () => {
  return (
    <div>
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
  );
};

export default DashboardData;

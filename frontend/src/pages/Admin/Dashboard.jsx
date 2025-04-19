import React from "react";
import QuickLinks from "../../components/Admin/Dashboard/QuickLink";
import Statistics from "../../components/Admin/Dashboard/Statistic";
import Chart from "../../components/Admin/Dashboard/Chart";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-6 items-stretch">
        <div className="flex-1">
          <Statistics />
        </div>
        <div className="w-72">
          <QuickLinks />
        </div>
      </div>

      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;

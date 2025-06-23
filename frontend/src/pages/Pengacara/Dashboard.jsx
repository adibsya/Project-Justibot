import React from 'react'
import QuickLinks from '../../components/Pengacara/DashboardLawyer/QuickLink'
import Statistics from '../../components/Pengacara/DashboardLawyer/Statistic'
import Chart from '../../components/Pengacara/DashboardLawyer/Chart'

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

export default Dashboard

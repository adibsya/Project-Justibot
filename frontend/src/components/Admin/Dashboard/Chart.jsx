import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const sessionData = [
  { date: 'Senin', sessions: 120 },
  { date: 'Selasa', sessions: 200 },
  { date: 'Rabu', sessions: 150 },
  { date: 'Kamis', sessions: 170 },
  { date: 'Jumat', sessions: 220 },
  { date: 'Sabtu', sessions: 180 },
  { date: 'Minggu', sessions: 250 },
];

const Chart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-4 border border-gray-300">
      <h2 className="text-lg font-bold mb-4">Trend of User Sessions</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sessionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sessions" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

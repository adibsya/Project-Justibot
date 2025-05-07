import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const weeklyData = [
  { date: "Senin", sessions: 120 },
  { date: "Selasa", sessions: 200 },
  { date: "Rabu", sessions: 150 },
  { date: "Kamis", sessions: 170 },
  { date: "Jumat", sessions: 220 },
  { date: "Sabtu", sessions: 180 },
  { date: "Minggu", sessions: 250 },
];

const monthlyData = [
  { date: "Minggu 1", sessions: 820 },
  { date: "Minggu 2", sessions: 950 },
  { date: "Minggu 3", sessions: 780 },
  { date: "Minggu 4", sessions: 1020 },
];

const yearlyData = [
  { date: "Jan", sessions: 3200 },
  { date: "Feb", sessions: 2950 },
  { date: "Mar", sessions: 3100 },
  { date: "Apr", sessions: 2800 },
  { date: "Mei", sessions: 3500 },
  { date: "Jun", sessions: 3300 },
  { date: "Jul", sessions: 3600 },
  { date: "Agu", sessions: 3900 },
  { date: "Sep", sessions: 3700 },
  { date: "Okt", sessions: 4000 },
  { date: "Nov", sessions: 3850 },
  { date: "Des", sessions: 4200 },
];

const Chart = () => {
  const [range, setRange] = useState("mingguan");

  const getData = () => {
    switch (range) {
      case "bulanan":
        return monthlyData;
      case "tahunan":
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#122E40] mb-1">
            Trend of User Sessions
          </h2>
        </div>
        <div className="flex space-x-2">
          {["mingguan", "bulanan", "tahunan"].map((type) => (
            <button
              key={type}
              onClick={() => setRange(type)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                range === type
                  ? "bg-[#731D2C] text-white border-[#731D2C]"
                  : "bg-white text-[#731D2C] border-[#E5DED5] hover:bg-gray-100"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={getData()}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
          <XAxis dataKey="date" stroke="#A69C7A" tick={{ fontSize: 12 }} />
          <YAxis stroke="#A69C7A" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5DED5",
              borderRadius: 10,
            }}
            labelStyle={{ color: "#731D2C" }}
            itemStyle={{ color: "#122E40" }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#731D2C"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

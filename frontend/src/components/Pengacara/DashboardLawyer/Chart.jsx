import React, { useState, useEffect } from "react";
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
import axios from "axios";

const Chart = () => {
  const [range, setRange] = useState("mingguan");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const res = await axios.get(`/api/grafik-user-sessions?range=${range}`);
        setData(res.data);
      } catch (err) {
        console.error("Gagal mengambil data sesi:", err);
      }
    };

    fetchSessionData();
  }, [range]);

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
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
          <XAxis
            dataKey="tanggal" // ganti dari 'date' ke 'tanggal' sesuai backend
            stroke="#A69C7A"
            tick={{ fontSize: 12 }}
          />
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

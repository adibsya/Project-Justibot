import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
import { FaUserCircle, FaChartLine, FaUserTie } from "react-icons/fa";
import logo_dokumen from "../../assets/logo_dokumen.png";

const DashboardData = () => {
  const [lawyersCount, setLawyersCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [range, setRange] = useState("mingguan");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/lawyers")
      .then(res => setLawyersCount(res.data.length))
      .catch(err => console.error("Gagal ambil lawyers:", err));

    axios.get("/api/articles")
      .then(res => setArticlesCount(res.data.length))
      .catch(err => console.error("Gagal ambil articles:", err));

    axios.get("/api/total-users")
      .then(res => setUsersCount(res.data.total))
      .catch(err => console.error("Gagal ambil users:", err));
  }, []);

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

  const statisticCards = [
    {
      icon: <FaUserTie size={24} />,
      label: "Jumlah Pengacara Terdaftar",
      value: `${lawyersCount} Orang`,
    },
    {
      icon: <FaChartLine size={24} />,
      label: "Jumlah Artikel Hukum",
      value: `${articlesCount} Artikel`,
    },
    {
      icon: <FaUserCircle size={24} />,
      label: "Jumlah Pengguna Terdaftar",
      value: `${usersCount} Pengguna`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* === Statistics & Documentation Side by Side === */}
      <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-6">
        {/* Statistics */}
        <div className="order-1 md:order-none bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-[#122E40] mb-6">Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {statisticCards.map((item, index) => (
              <div
                key={index}
                className="rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-[#F9F8F5]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#A69C7A]/10 text-[#731D2C]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <h3 className="text-lg font-semibold text-[#122E40]">
                      {item.value}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation */}
        <div className="order-2 md:order-none bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-fit">
          <h2 className="text-2xl font-bold text-[#122E40] mb-6">Documentation</h2>
          <Link to="/admin/documentation" className="block group">
            <div className="bg-[#F9F8F5] hover:bg-[#E5DED5] transition-all duration-200 p-6 rounded-xl flex items-center gap-4 border border-gray-100 shadow-sm group-hover:shadow-md">
              <div className="w-12 h-12 bg-[#A69C7A]/10 rounded-full flex items-center justify-center">
                <img src={logo_dokumen} alt="file icon" className="w-6 h-6" />
              </div>
              <div className="text-sm text-[#122E40]">
                <p className="font-medium leading-snug">
                  Klik untuk melihat<br /> dokumentasi admin
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-[#122E40]">
            Trend of User Sessions
          </h2>
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
              dataKey="tanggal"
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
    </div>
  );
};

export default DashboardData;

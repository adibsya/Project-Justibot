import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const StatistikChatbot = () => {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("mingguan");
  const [dataKunjungan, setDataKunjungan] = useState([]);
  const [dataKepuasanPengguna, setDataKepuasanPengguna] = useState([]);
  const [dataKunjunganLawyer, setDataKunjunganLawyer] = useState([]);
  const [dataTopikPopuler, setDataTopikPopuler] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/grafik-lawyer/statistik-kunjungan");
        if (res.data.success) {
          const transformed = res.data.data.map((item) => ({
            nama: item.nama,
            nilai: item.total_kunjungan,
          }));
          setDataKunjunganLawyer(transformed);
        }
      } catch (error) {
        console.error("Gagal ambil data kunjungan:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("/api/grafik-puas/statistik-puas?range=bulanan")
      .then((res) => setDataKepuasanPengguna(res.data))
      .catch((err) => console.error("Gagal fetch data:", err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/grafik-artikel/statistik-kunjungan?range=${range}`,
        );
        setDataKunjungan(res.data);
      } catch (err) {
        console.error("Gagal ambil data grafik:", err);
      }
    };

    fetchData();
  }, [range]);

  useEffect(() => {
    async function fetchTopik() {
      try {
        const response = await fetch("/api/grafik-chatbot");
        if (!response.ok) throw new Error("Gagal mengambil data topik");
        const data = await response.json();
        setDataTopikPopuler(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTopik();
  }, []);

  const dataPerformansiChatbot = [
    { kategori: "Akurasi Jawaban", nilai: 87 },
    { kategori: "Resolusi Masalah", nilai: 75 },
    { kategori: "Kecepatan Respons", nilai: 92 },
    { kategori: "Pemahaman Konteks", nilai: 78 },
    { kategori: "Kemudahan Navigasi", nilai: 85 },
  ];

  const WARNA = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  useEffect(() => {
    // Simulasi loading API
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center text-[#122E40]">
        Dashboard Statistik Chatbot
      </h1>

      {/* Bagian 1: Tren Artikel dan Tingkat Kepuasan */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#122E40] border-b pb-2">
          Statistik Penggunaan Chatbot
        </h2>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {/* Grafik Tren Artikel */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between flex-wrap gap-3 md:gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-1">
                  Tren Artikel yang Dikunjungi
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {["mingguan", "bulanan", "tahunan"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setRange(type)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md border text-xs md:text-sm font-medium transition ${
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
            <div className="h-[250px] md:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dataKunjungan}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
                  <XAxis
                    dataKey="tanggal"
                    stroke="#A69C7A"
                    tick={{ fontSize: 10, dy: 5 }}
                    height={40}
                    angle={0}
                    textAnchor="middle"
                  />
                  <YAxis stroke="#A69C7A" tick={{ fontSize: 10 }} width={40} />
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
                    dataKey="kunjungan"
                    name="Jumlah Kunjungan"
                    stroke="#731D2C"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik Kepuasan Pengguna */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 mt-4 md:mt-6">
            <div className="mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-1">
                Tingkat Kepuasan Pengguna
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Persentase kepuasan pengguna terhadap jawaban chatbot
              </p>
            </div>
            <div className="h-[250px] md:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dataKepuasanPengguna}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
                  <XAxis
                    dataKey="bulan"
                    stroke="#A69C7A"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis stroke="#A69C7A" tick={{ fontSize: 10 }} width={30} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5DED5",
                      borderRadius: 10,
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area
                    type="monotone"
                    dataKey="puas"
                    name="Puas"
                    stroke="#00C49F"
                    fill="#00C49F"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="tidakPuas"
                    name="Tidak Puas"
                    stroke="#FF8042"
                    fill="#FF8042"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian 2: Performa Chatbot */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#122E40] border-b pb-2">
          Metrik Interaksi Pengguna
        </h2>

        {/* Grid untuk Pengacara yang sering dihubungi dan Topik Populer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Grafik Pengacara yang sering dihubungi */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-3 md:mb-4">
              Pengacara yang Sering Dihubungi
            </h2>

            {dataKunjunganLawyer.length === 0 ? (
              <p className="text-center text-gray-500">Sedang memuat data...</p>
            ) : (
              <div className="h-[280px] md:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={dataKunjunganLawyer}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="nama" />
                    <Tooltip
                      formatter={(value) => [`${value} kunjungan`, "Jumlah"]}
                    />
                    <Legend />
                    <Bar dataKey="nilai" fill="#612A22" name="Jumlah Kunjungan">
                      {dataKunjunganLawyer.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={WARNA[index % WARNA.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Grafik Topik Populer */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-1">
                Topik Hukum Populer
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Kategori hukum yang paling banyak ditanyakan
              </p>
            </div>
            <div className="h-[230px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataTopikPopuler}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
                  <XAxis
                    dataKey="topik"
                    stroke="#A69C7A"
                    tick={{ fontSize: 9, dy: 5 }}
                    height={50}
                    angle={0}
                    textAnchor="middle"
                    interval={0}
                  />
                  <YAxis stroke="#A69C7A" tick={{ fontSize: 10 }} width={30} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5DED5",
                      borderRadius: 10,
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Bar
                    dataKey="jumlah"
                    name="Jumlah Pertanyaan"
                    fill="#731D2C"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikChatbot;

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
  const [documentStats, setDocumentStats] = useState({
    totalDocuments: 0,
    categoryCounts: {},
    totalViews: 0,
    mostViewed: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/grafik-puas/statistik-puas?range=bulanan")
      .then((res) => setDataKepuasanPengguna(res.data))
      .catch((err) => console.error("Gagal fetch data:", err));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/grafik-artikel/statistik-kunjungan?range=${range}`,
        );
        setDataKunjungan(res.data);
      } catch (err) {
        console.error("Gagal ambil data grafik:", err);
      }
    };

    fetchData();
  }, [range]);

  // Add new useEffect to fetch document statistics
  useEffect(() => {
    const fetchDocumentStats = async () => {
      try {
        const response = await axios.get("/api/documents/stats");
        if (response.data.success) {
          setDocumentStats(response.data.data);
        }
      } catch (err) {
        console.error("Gagal mengambil statistik dokumen:", err);
      }
    };

    fetchDocumentStats();
  }, []);

  // Format category data for pie chart
  const documentCategoriesData = Object.entries(
    documentStats.categoryCounts || {},
  ).map(([category, count]) => ({
    category,
    value: count,
  }));

  // Data untuk grafik lainnya
  const dataPertanyaanSering = [
    { pertanyaan: "Cara mengajukan perceraian?", jumlah: 140 },
    { pertanyaan: "Persyaratan hukum untuk bisnis", jumlah: 110 },
    { pertanyaan: "Hukum hak asuh anak", jumlah: 90 },
    { pertanyaan: "Pembagian harta saat perceraian", jumlah: 85 },
    { pertanyaan: "Hak pemutusan hubungan kerja", jumlah: 70 },
  ];

  const dataPengacaraSering = [
    { nama: "Ahmad Dhani", nilai: 35 },
    { nama: "Budi Santoso", nilai: 25 },
    { nama: "Cindy Wijaya", nilai: 20 },
    { nama: "David Susanto", nilai: 15 },
    { nama: "Eva Muliani", nilai: 5 },
  ];

  const dataWaktuRespons = [
    { jam: "00:00", waktuRespons: 2.5 },
    { jam: "03:00", waktuRespons: 2.1 },
    { jam: "06:00", waktuRespons: 3.2 },
    { jam: "09:00", waktuRespons: 4.8 },
    { jam: "12:00", waktuRespons: 5.2 },
    { jam: "15:00", waktuRespons: 4.3 },
    { jam: "18:00", waktuRespons: 3.8 },
    { jam: "21:00", waktuRespons: 2.9 },
  ];

  const dataTopikPopuler = [
    { topik: "Perceraian", jumlah: 320 },
    { topik: "Hak Asuh Anak", jumlah: 280 },
    { topik: "Hukum Bisnis", jumlah: 240 },
    { topik: "Ketenagakerjaan", jumlah: 210 },
    { topik: "Properti", jumlah: 190 },
    { topik: "Pidana", jumlah: 150 },
  ];

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

        {/* Grid untuk Waktu Respon dan Topik Populer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Grafik Waktu Respon */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-3 md:mb-4">
              Pengacara yang Sering Dihubungi
            </h2>
            <div className="h-[280px] md:h-[350px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    data={dataPengacaraSering}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius="70%"
                    fill="#8884d8"
                    dataKey="nilai"
                    nameKey="nama"
                    label={({ nama, percent }) =>
                      `${nama} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {dataPengacaraSering.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={WARNA[index % WARNA.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} kontak`, "Jumlah"]}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
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
                    angle={-45}
                    textAnchor="end"
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

      {/* Bagian 3: Statistik Dokumen */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#122E40] border-b pb-2">
          Statistik Dokumen
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Most Viewed Documents Chart */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-1">
                Dokumen Terbanyak Dilihat
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Dokumen dengan jumlah kunjungan tertinggi
              </p>
            </div>
            <div className="h-[280px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={documentStats.mostViewed || []}
                  layout="vertical"
                  margin={{ top: 10, right: 10, left: 50, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
                  <XAxis type="number" stroke="#A69C7A" />
                  <YAxis
                    dataKey="title"
                    type="category"
                    stroke="#A69C7A"
                    width={120}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5DED5",
                      borderRadius: 10,
                    }}
                  />
                  <Bar
                    dataKey="views"
                    name="Jumlah Kunjungan"
                    fill="#731D2C"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Document Categories Distribution Chart */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-1">
                Distribusi Kategori Dokumen
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Perbandingan jumlah dokumen berdasarkan kategori
              </p>
            </div>
            <div className="h-[280px] md:h-[350px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    data={documentCategoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius="70%"
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="category"
                    label={({ category, percent }) =>
                      `${category} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {documentCategoriesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={WARNA[index % WARNA.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [
                      `${value} dokumen`,
                      props.payload.category,
                    ]}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Document Views Summary */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex flex-wrap justify-between">
            <div className="text-center px-4 py-3 bg-blue-50 rounded-xl flex-1 mx-2">
              <h3 className="text-xl font-bold text-[#122E40]">
                {documentStats.totalDocuments}
              </h3>
              <p className="text-sm text-gray-500">Total Dokumen</p>
            </div>
            <div className="text-center px-4 py-3 bg-green-50 rounded-xl flex-1 mx-2">
              <h3 className="text-xl font-bold text-[#122E40]">
                {documentStats.totalViews?.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500">Total Kunjungan</p>
            </div>
            <div className="text-center px-4 py-3 bg-amber-50 rounded-xl flex-1 mx-2">
              <h3 className="text-xl font-bold text-[#122E40]">
                {documentStats.totalDocuments > 0
                  ? Math.round(
                      documentStats.totalViews / documentStats.totalDocuments,
                    )
                  : 0}
              </h3>
              <p className="text-sm text-gray-500">Rata-rata Kunjungan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikChatbot;

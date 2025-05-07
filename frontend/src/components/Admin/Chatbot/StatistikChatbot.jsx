import React, { useState, useEffect } from "react";
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

  // Data tren artikel berdasarkan periode
  const dataMingguanArtikel = [
    { tanggal: "Senin", kunjungan: 120 },
    { tanggal: "Selasa", kunjungan: 200 },
    { tanggal: "Rabu", kunjungan: 150 },
    { tanggal: "Kamis", kunjungan: 170 },
    { tanggal: "Jumat", kunjungan: 220 },
    { tanggal: "Sabtu", kunjungan: 180 },
    { tanggal: "Minggu", kunjungan: 250 },
  ];

  const dataBulananArtikel = [
    { tanggal: "Minggu 1", kunjungan: 820 },
    { tanggal: "Minggu 2", kunjungan: 950 },
    { tanggal: "Minggu 3", kunjungan: 780 },
    { tanggal: "Minggu 4", kunjungan: 1020 },
  ];

  const dataTahunanArtikel = [
    { tanggal: "Jan", kunjungan: 3200 },
    { tanggal: "Feb", kunjungan: 2950 },
    { tanggal: "Mar", kunjungan: 3100 },
    { tanggal: "Apr", kunjungan: 2800 },
    { tanggal: "Mei", kunjungan: 3500 },
    { tanggal: "Jun", kunjungan: 3300 },
    { tanggal: "Jul", kunjungan: 3600 },
    { tanggal: "Agu", kunjungan: 3900 },
    { tanggal: "Sep", kunjungan: 3700 },
    { tanggal: "Okt", kunjungan: 4000 },
    { tanggal: "Nov", kunjungan: 3850 },
    { tanggal: "Des", kunjungan: 4200 },
  ];

  // Fungsi untuk mendapatkan data sesuai range yang dipilih
  const getDataArtikel = () => {
    switch (range) {
      case "bulanan":
        return dataBulananArtikel;
      case "tahunan":
        return dataTahunanArtikel;
      default:
        return dataMingguanArtikel;
    }
  };

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

  const dataKepuasanPengguna = [
    { bulan: "Jan", puas: 85, tidakPuas: 15 },
    { bulan: "Feb", puas: 82, tidakPuas: 18 },
    { bulan: "Mar", puas: 88, tidakPuas: 12 },
    { bulan: "Apr", puas: 90, tidakPuas: 10 },
    { bulan: "Mei", puas: 85, tidakPuas: 15 },
    { bulan: "Jun", puas: 92, tidakPuas: 8 },
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
                  data={getDataArtikel()}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
                  <XAxis
                    dataKey="tanggal"
                    stroke="#A69C7A"
                    tick={{ fontSize: 10, dy: 5 }}
                    height={40}
                    angle={-45}
                    textAnchor="end"
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
                    stackId="1"
                    stroke="#00C49F"
                    fill="#00C49F"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="tidakPuas"
                    name="Tidak Puas"
                    stackId="1"
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
            <div className="mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-1">
                Waktu Respon Chatbot
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Rata-rata waktu respon dalam detik berdasarkan jam
              </p>
            </div>
            <div className="h-[230px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dataWaktuRespons}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
                  <XAxis
                    dataKey="jam"
                    stroke="#A69C7A"
                    tick={{ fontSize: 10 }}
                    height={30}
                  />
                  <YAxis stroke="#A69C7A" tick={{ fontSize: 10 }} width={30} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5DED5",
                      borderRadius: 10,
                    }}
                    formatter={(value) => [`${value} detik`, "Waktu Respon"]}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Line
                    type="monotone"
                    dataKey="waktuRespons"
                    name="Waktu Respon"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
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

      {/* Bagian 3: Data Pengguna */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#122E40] border-b pb-2">
          Analisis Pertanyaan dan Pengacara
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Grafik Pertanyaan Sering */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-3 md:mb-4">
              Pertanyaan yang Sering Muncul
            </h2>
            <div className="h-[280px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataPertanyaanSering}
                  layout="vertical"
                  margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis
                    dataKey="pertanyaan"
                    type="category"
                    width={120}
                    tick={{ fontSize: 9 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5DED5",
                      borderRadius: 10,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="jumlah" fill="#B9AB99" name="Frekuensi" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik Pengacara Sering Dihubungi */}
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
        </div>
      </div>

      {/* Bagian 4: Performansi Chatbot */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#122E40] border-b pb-2">
          Evaluasi Kinerja Chatbot
        </h2>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-bold text-[#122E40] mb-1">
              Performansi Chatbot
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              Evaluasi berbagai aspek kinerja chatbot (skala 0-100)
            </p>
          </div>
          <div className="flex justify-center py-2 md:py-4">
            <div className="w-full h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={dataPerformansiChatbot}>
                  <PolarGrid stroke="#E5DED5" />
                  <PolarAngleAxis
                    dataKey="kategori"
                    tick={{ fill: "#122E40", fontSize: 10 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "#A69C7A", fontSize: 10 }}
                  />
                  <Radar
                    name="Nilai"
                    dataKey="nilai"
                    stroke="#731D2C"
                    fill="#731D2C"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #E5DED5",
                      borderRadius: 10,
                    }}
                    formatter={(value) => [`${value}/100`, "Skor"]}
                  />
                  <Legend wrapperStyle={{ paddingTop: 10 }} iconType="circle" />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikChatbot;

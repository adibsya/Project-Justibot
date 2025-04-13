import React from 'react';
import { FaUserCircle, FaChartLine, FaBell, FaQuestionCircle } from 'react-icons/fa';

const Statistic = () => {
  const stats = [
    {
      icon: <FaUserCircle size={28} />,
      label: 'Jumlah Pengacara Terdaftar',
      value: '123 Orang',
    },
    {
      icon: <FaChartLine size={28} />,
      label: 'Jumlah Artikel Hukum',
      value: '23 Artikel',
    },
    {
      icon: <FaBell size={28} />,
      label: 'Jumlah Notifikasi Terkirim',
      value: '34 Notifikasi',
    },
    {
      icon: <FaQuestionCircle size={28} />,
      label: 'Jumlah Pertanyaan Tidak Terjawab',
      value: '0 Pertanyaan',
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-300">
      <h2 className="text-lg font-bold mb-4">Statistics</h2>
      <div className="flex flex-wrap gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 w-60 h-24 p-4 rounded-md flex items-center gap-3"
          >
            <div className="text-black">{item.icon}</div>
            <div className="flex flex-col justify-center">
              <p className="text-sm leading-4">{item.label}</p>
              <h3 className="font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistic;

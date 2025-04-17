import React from 'react';
import {
  FaUserCircle,
  FaChartLine,
  FaBell,
  FaQuestionCircle,
} from 'react-icons/fa';

const stats = [
  {
    icon: <FaUserCircle size={24} />,
    label: 'Jumlah Pengacara Terdaftar',
    value: '123 Orang',
    bg: 'bg-[#E5DED5]',
  },
  {
    icon: <FaChartLine size={24} />,
    label: 'Jumlah Artikel Hukum',
    value: '23 Artikel',
    bg: 'bg-[#F2EFEA]',
  },
  {
    icon: <FaBell size={24} />,
    label: 'Jumlah Notifikasi Terkirim',
    value: '34 Notifikasi',
    bg: 'bg-[#EFE9E7]',
  },
  {
    icon: <FaQuestionCircle size={24} />,
    label: 'Jumlah Pertanyaan Tidak Terjawab',
    value: '0 Pertanyaan',
    bg: 'bg-[#F6F3F1]',
  },
];

const Statistic = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#122E40] mb-1">Statistics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-[#F9F8F5]`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#A69C7A]/10 text-[#731D2C]">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <h3 className="text-lg font-semibold text-[#122E40]">{item.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistic;

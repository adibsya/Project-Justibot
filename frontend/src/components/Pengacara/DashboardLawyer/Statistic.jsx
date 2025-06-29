import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaChartLine, FaUserTie } from 'react-icons/fa';
import axios from 'axios';

const Statistic = () => {
  const [lawyersCount, setLawyersCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    axios.get('/api/lawyers')
      .then(res => setLawyersCount(res.data.length))
      .catch(err => console.error('Gagal ambil lawyers:', err));

    axios.get('/api/articles')
      .then(res => setArticlesCount(res.data.length))
      .catch(err => console.error('Gagal ambil articles:', err));

      axios.get('/api/total-users')
      .then(res => setUsersCount(res.data.total))
      .catch(err => console.error('Gagal ambil users:', err));
  }, []);

  const cards = [
    {
      icon: <FaUserTie size={24} />,
      label: 'Jumlah Pengacara Terdaftar',
      value: `${lawyersCount} Orang`,
    },
    {
      icon: <FaChartLine size={24} />,
      label: 'Jumlah Artikel Hukum',
      value: `${articlesCount} Artikel`,
    },
    {
      icon: <FaUserCircle size={24} />,
      label: 'Jumlah Pengguna Terdaftar',
      value: `${usersCount} Pengguna`,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#122E40] mb-1">Statistics</h2>
      </div>

      <div className="flex flex-col-1 justify-around md:flex-cols-2 xl:flex-cols-4 gap-6">
        {cards.map((item, index) => (
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

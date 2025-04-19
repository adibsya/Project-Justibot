import React from 'react';
import { Link } from 'react-router-dom';
import assets from '../../../assets/assets';

const QuickLink = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#122E40]">Documentation</h2>
      </div>

      <Link to="/admin/documentation" className="block group">
        <div className="bg-[#F9F8F5] hover:bg-[#E5DED5] transition-all duration-200 p-6 rounded-xl flex items-center gap-4 border border-gray-100 shadow-sm group-hover:shadow-md">
          <div className="w-12 h-12 bg-[#A69C7A]/10 rounded-full flex items-center justify-center">
            <img src={assets.logo_dokumen} alt="file icon" className="w-6 h-6" />
          </div>
          <div className="text-sm text-[#122E40]">
            <p className="font-medium leading-snug">Klik untuk melihat<br /> dokumentasi admin</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuickLink;

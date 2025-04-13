import React from 'react';
import assets from '../../../assets/assets';

const QuickLink = () => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-300 w-64">
      <h2 className="font-bold mb-3">Quick Links</h2>
      <div className="bg-gray-300 h-20 rounded mb-3"></div>
      <div className="bg-gray-300 h-20 rounded mb-3"></div>
      <div className="bg-gray-300 h-20 rounded mb-3"></div>

      <h2 className="font-bold mt-6 mb-3">Documentation</h2>
      <div className="bg-gray-300 h-24 rounded flex items-center px-4 gap-3">
        <div className="flex flex-col items-center justify-center">
          <img src={assets.logo_dokumen} alt="file icon" className="w-10 h-8 mb-1" />
        </div>
        <p className="text-sm leading-tight">
          Click untuk melihat<br />
          dokumentasi penggunaan
        </p>
      </div>
    </div>
  );
};

export default QuickLink;

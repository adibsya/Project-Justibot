import React from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/assets";

const Artikel = () => {

  return (
    <div className="bg-gray-100 min-h-screen pt-24 text-onSurface">
      <div className="w-full mx-auto px-12 py-12 flex flex-col lg:flex-row gap-8">
        {/* Konten Utama */}
        <div className="lg:w-2/3 bg-white p-8 shadow-md rounded-lg">
          {/* Breadcrumbs */}
          <p className="text-sm text-gray-500 mb-4">
            <Link to="/blog" className="text-blue-600 hover:underline">Blog</Link> &gt; 
            <span className="text-gray-700"> Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?</span>
          </p>
          
          <h1 className="text-3xl font-bold mb-6">
            Efisiensi yang Dilakukan untuk Kesejahteraan Rakyat Berujung Korupsi?
          </h1>
          
          {/* Gambar Artikel */}
          <img
            src={assets.berita}
            alt="Efisiensi Anggaran 2025"
            className="max-w-[700px] w-full mx-auto rounded-lg p-10"
          />
          
          <p className="text-gray-700 leading-relaxed text-lg">
            Dalam upaya meningkatkan kesejahteraan masyarakat, pemerintah sering kali melakukan efisiensi anggaran.
            Namun, apakah efisiensi ini benar-benar bermanfaat atau justru membuka celah bagi tindakan korupsi?
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            Sejarah menunjukkan bahwa kebijakan efisiensi anggaran sering kali dijadikan alasan untuk mengurangi biaya,
            namun di sisi lain, transparansi dalam penggunaan anggaran sering kali diabaikan. Hal ini menyebabkan munculnya
            berbagai praktik penyimpangan keuangan.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            Kasus-kasus besar dalam beberapa dekade terakhir menunjukkan bahwa banyak pejabat yang memanfaatkan kebijakan ini
            untuk kepentingan pribadi. Salah satu contoh yang paling mencolok adalah ketika anggaran untuk sektor pendidikan dan
            kesehatan dipangkas, tetapi alokasi dana untuk proyek-proyek yang tidak transparan justru meningkat.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            Dalam menghadapi permasalahan ini, dibutuhkan mekanisme pengawasan yang lebih ketat serta keterlibatan masyarakat
            dalam mengawasi penggunaan dana publik. Tanpa transparansi yang baik, kebijakan efisiensi justru dapat menjadi bumerang
            yang merugikan masyarakat secara luas.
          </p>
        </div>

        {/* Sidebar Rekomendasi */}
        <aside id="recommendArticles" className="lg:w-1/3 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Rekomendasi untuk Anda</h2>
          <ul className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <li key={index} className="flex gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    Efisiensi yang dilakukan untuk kesejahteraan rakyat berujung korupsi?
                  </p>
                  <p className="text-xs text-gray-500">19 Februari 2025</p>
                </div>
              </li>
            ))}
          </ul>
          <Link 
            to="/blog?scrollTo=recommendations" 
            className="text-blue-600 text-sm mt-4 cursor-pointer hover:underline inline-block"
          >
            Lihat Selengkapnya →
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Artikel;

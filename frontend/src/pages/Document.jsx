import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Document = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  const documents = [
    {
      id: 1,
      title: "Surat Perjanjian Kerjasama",
      description: "Dokumen resmi yang mengatur kesepakatan antara dua pihak.",
      link: "/form/perjanjian-kerjasama",
    },
    {
      id: 2,
      title: "Surat Kuasa",
      description:
        "Dokumen untuk memberikan kuasa kepada seseorang dalam hal tertentu.",
      link: "/form/surat-kuasa",
    },
    {
      id: 3,
      title: "Surat Perjanjian Sewa",
      description:
        "Dokumen untuk mengatur sewa menyewa antara pemilik dan penyewa.",
      link: "/form/perjanjian-sewa",
    },
    {
      id: 4,
      title: "Surat Perjanjian Jual Beli",
      description: "Dokumen yang mengatur transaksi jual beli secara sah.",
      link: "/form/perjanjian-jual-beli",
    },
    {
      id: 5,
      title: "Surat Perjanjian Hutang Piutang",
      description: "Dokumen yang berisi kesepakatan mengenai hutang piutang.",
      link: "/form/perjanjian-hutang",
    },
    {
      id: 6,
      title: "Surat Pernyataan",
      description: "Dokumen resmi untuk menyatakan sesuatu secara sah.",
      link: "/form/surat-pernyataan",
    },
    {
      id: 7,
      title: "Surat Perjanjian Kerja",
      description: "Dokumen kontrak kerja antara perusahaan dan karyawan.",
      link: "/form/perjanjian-kerja",
    },
  ];

  const visibleDocs = showAll ? documents : documents.slice(0, 6);

  return (
    <div className="bg-onPrimary mt-14">
      {" "}
      {/* Added margin-top */}
      <div className="bg-[#612A22] text-white rounded-b-3xl">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold">Daftar Dokumen</h1>
          <p className="text-lg">
            Buat dokumen hukum sesuai dengan kebutuhan Anda
          </p>
        </div>
      </div>
      <div className="bg-white text-black py-0 px-6 flex flex-col md:flex-row items-center justify-center text-center md:text-left relative overflow-hidden">
        <div
          className={`md:w-1/3 transition-all duration-700 self-start mt-40 mx-10 ${animate ? "translate-x-0 -translate-y-4 opacity-100" : "-translate-x-20 opacity-0"}`}
        >
          <h2 className="text-3xl font-bold text-justify">
            Dokumen hukum bisa untuk berbagai keperluan!
          </h2>
        </div>

        <div
          className={`md:w-1/3 flex justify-center transition-all duration-700 pt-10 pb-0 ${animate ? "translate-y-0 opacity-100 scale-110" : "translate-y-20 opacity-0 scale-100"}`}
        >
          <img
            src={assets.item_listdoc}
            alt="Dokumen Hukum"
            className="w-40 md:w-60 lg:w-80 h-auto"
          />
        </div>

        <div
          className={`md:w-1/3 transition-all duration-700 self-end mb-40 mx-10 ${animate ? "translate-x-0 translate-y-4 opacity-100" : "translate-x-20 opacity-0"}`}
        >
          <p className="text-lg font-bold text-justify">
            Mulai dari perjanjian kontrak, surat kuasa, hingga dokumen bisnis,
            semua bisa Anda buat dengan mudah di Justibot. Cepat, aman, dan sah
            secara hukum!
          </p>
        </div>
      </div>
      <div className="bg-[#B9AB99] py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#612A22] text-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold">{doc.title}</h3>
              <p className="mt-2 text-sm">{doc.description}</p>
              <button
                onClick={() => navigate(doc.link)}
                className="mt-4 bg-[#B9AB99] text-[#612A22] font-bold py-2 px-4 rounded hover:bg-[#bfa290] transition"
              >
                Isi Formulir
              </button>
            </div>
          ))}
        </div>

        {documents.length > 6 && !showAll && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="bg-[#612A22] text-white py-2 px-6 rounded hover:bg-[#4a1f1b] transition"
            >
              Selengkapnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;

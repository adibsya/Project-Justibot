import React from "react";

const sections = [
  {
    icon: "🧭",
    title: "Navigasi Dashboard",
    description: `Setelah login sebagai admin, Anda akan diarahkan ke halaman dashboard. Gunakan sidebar untuk mengakses fitur seperti Articles, Lawyers, dan Chatbot Analysis.`,
  },
  {
    icon: "📝",
    title: "Kelola Artikel",
    description: `Masuk ke menu Articles. Klik tombol "Tambah Artikel" untuk membuat artikel baru. Anda juga dapat mengedit atau menghapus artikel yang sudah ada.`,
  },
  {
    icon: "👨‍⚖️",
    title: "Kelola Data Diri",
    description: `Buka menu Data Diri. Edit informasi pribadi Anda seperti nama, email, dan nomor telepon. Pastikan data selalu akurat dan terkini.`,
  },
  {
    icon: "🚪",
    title: "Logout",
    description: `Klik ikon logout di pojok kanan atas untuk keluar dan mengakhiri sesi Anda dengan aman.`,
  },
];

const PengacaraDocumentation = () => {
  return (
    <div className="bg-white min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-[#122E40] tracking-tight leading-tight">
            Dokumentasi Pengacara
          </h1>
          <p className="mt-4 text-lg text-[#73675D] max-w-2xl mx-auto">
            Panduan lengkap untuk pengelolaan sistem administrasi Justibot secara profesional, efisien, dan elegan.
          </p>
        </header>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="relative bg-[#F9F9F9] border border-[#E5DED5] rounded-3xl shadow-sm hover:shadow-md transition-all p-8 group hover:scale-[1.02] duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#731D2C] via-transparent to-[#122E40]" />
              <div className="flex items-start gap-4 mb-5">
                <div className="text-4xl text-[#731D2C] group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-semibold text-[#122E40]">
                  {section.title}
                </h2>
              </div>
              <p className="text-[#73675D] text-lg leading-relaxed">
                {section.description}
              </p>
              <div className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-[#A69C7A] to-transparent" />
              <div className="absolute bottom-4 right-6 text-xs text-[#A69C7A] italic">Justibot Guide</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-28 bg-[#F9F9F9] py-12 rounded-2xl shadow-inner border border-[#E5DED5]">
          <h3 className="text-2xl font-semibold text-[#122E40] mb-3">Masih butuh bantuan?</h3>
          <p className="text-[#73675D] mb-6">Kunjungi pusat bantuan kami atau hubungi tim support Justibot untuk dukungan lebih lanjut.</p>
          <button className="bg-[#731D2C] text-white font-medium px-6 py-3 rounded-full shadow hover:bg-[#5b1523] transition">
            Hubungi Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengacaraDocumentation;
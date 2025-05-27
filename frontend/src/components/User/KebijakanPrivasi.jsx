import React from 'react';

const KebijakanPrivasi = () => {
  return (
    <div className="min-h-screen bg-onPrimary text-gray-800 px-6 py-10">
      <div className="max-w-6xl mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-4">Kebijakan Privasi Justibot</h1>
        <p className="text-sm text-gray-600 mb-4">Tanggal Berlaku: 23 Mei 2025</p>
        <hr />

        <section className="mb-6 mt-8">
          <h2 className="text-xl font-semibold mb-2">1. Pengantar</h2>
          <p>
            Kebijakan Privasi ini menjelaskan bagaimana Justibot mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat menggunakan layanan kami. Dengan mengakses Website Justibot, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Informasi yang Kami Kumpulkan</h2>
          <p>Kami dapat mengumpulkan informasi berikut:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Informasi Identitas:</strong> Nama, alamat email, dan informasi akun.</li>
            <li><strong>Informasi Penggunaan:</strong> Aktivitas Anda di Website, termasuk pertanyaan yang diajukan ke chatbot, artikel yang dibaca, dan dokumen yang diunduh.</li>
            <li><strong>Data Teknis:</strong> Alamat IP, jenis perangkat, browser, dan sistem operasi yang digunakan.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Penggunaan Informasi</h2>
          <p>Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Meningkatkan kualitas layanan dan pengalaman pengguna.</li>
            <li>Memberikan respons yang lebih relevan melalui chatbot dan artikel.</li>
            <li>Mengelola akun pengguna dan permintaan layanan.</li>
            <li>Mengirimkan pembaruan, pengumuman, atau informasi terkait Justibot jika pengguna menyetujuinya.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Penyimpanan dan Keamanan Data</h2>
          <p>
            Data Anda disimpan di server yang aman dengan langkah-langkah teknis dan organisasi untuk mencegah akses tidak sah, perubahan, atau penghapusan data oleh pihak yang tidak berwenang. Namun, kami tidak dapat menjamin keamanan mutlak dari sistem penyimpanan digital.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Pembagian Informasi kepada Pihak Ketiga</h2>
          <p>
            Justibot tidak menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali jika diwajibkan oleh hukum atau untuk melindungi hak dan kepentingan hukum Justibot dan pengguna lainnya.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Cookie dan Teknologi Pelacak</h2>
          <p>
            Kami menggunakan cookie untuk meningkatkan performa Website, menganalisis penggunaan layanan, dan menyesuaikan pengalaman pengguna. Anda dapat menonaktifkan cookie melalui pengaturan browser, namun beberapa fungsi mungkin tidak berjalan optimal.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Hak Pengguna</h2>
          <p>Anda memiliki hak untuk:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Meminta akses atau salinan data pribadi Anda.</li>
            <li>Meminta koreksi terhadap data yang tidak akurat.</li>
            <li>Meminta penghapusan akun dan data pribadi tertentu.</li>
            <li>Menarik persetujuan penggunaan data kapan saja (dengan konsekuensi terbatasnya akses layanan).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Perubahan Kebijakan Privasi</h2>
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diinformasikan melalui Website dan berlaku sejak tanggal pembaruan. Anda disarankan untuk meninjau halaman ini secara berkala.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Kontak</h2>
          <p>
            Jika Anda memiliki pertanyaan atau permintaan terkait kebijakan ini, silakan hubungi kami melalui halaman <a href="/kontak" className="text-blue-600 underline">Kontak</a> atau melalui email di <a href="mailto:privacy@justibot.id" className="text-blue-600 underline">privacy@justibot.id</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default KebijakanPrivasi;

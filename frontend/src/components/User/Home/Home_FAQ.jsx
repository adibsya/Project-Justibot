import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { assets } from "../../../assets/assets";

const Home_FAQ = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#faq" || location.state?.scrollToFaq) {
      setTimeout(() => {
        scroller.scrollTo("faq", {
          smooth: true,
          duration: 500,
          offset: -40,
        });
      }, 300);
    }
  }, [location]);

  return (
    <div
      className="bg-onPrimary py-10 md:py-16 relative overflow-hidden"
      id="faq"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-textPrimary mb-8 text-center md:text-left">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Image on left for desktop, top for mobile */}
          <div className="w-full md:w-2/5 order-2 md:order-1">
            <img
              src={assets.home_faq}
              alt="FAQ"
              className="max-w-full h-auto mx-auto md:mx-0"
            />
          </div>

          {/* Accordion on right for desktop, bottom for mobile */}
          <div className="w-full md:w-3/5 space-y-4 order-1 md:order-2">
            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                Bagaimana cara membuat akun Justibot?
              </div>
              <div className="collapse-content text-sm">
                Silakan Anda klik tombol Login / Sign Up di pojok kanan atas.
                Anda akan diminta untuk mengisi formulir pendaftaran dengan
                informasi seperti nama, alamat email, dan kata sandi. Setelah
                mengisi formulir, Anda perlu memverifikasi alamat email Anda
                melalui tautan yang kami kirimkan.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                Saya lupa kata sandi saya. Apa yang harus saya lakukan?
              </div>
              <div className="collapse-content text-sm">
                Klik “Lupa Kata Sandi” pada halaman login, dan anda akan diminta
                untuk memasukkan alamat email anda yang terdaftar. Kami akan
                mengirimkan instruksi melalui email tentang cara mengatur ulang
                kata sandi Anda. Pastikan untuk memeriksa folder spam atau junk
                mail Anda jika Anda tidak melihat email tersebut di kotak masuk.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                Apakah saya perlu membuat akun untuk menggunakan website ini?
              </div>
              <div className="collapse-content text-sm">
                Ya, Anda perlu membuat akun untuk mengakses fitur-fitur lengkap
                di Justibot, termasuk mengunduh dokumen hukum, chatbot, dan juga
                daftar pengacara.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                Saya tidak menerima email verifikasi/reset kata sandi. Apa yang
                harus saya lakukan?
              </div>
              <div className="collapse-content text-sm">
                Jika Anda tidak menerima email verifikasi atau reset kata sandi,
                harap periksa folder spam atau junk mail Anda terlebih dahulu.
                Pastikan juga Anda memasukkan alamat email yang benar saat
                mendaftar atau meminta reset kata sandi. Jika Anda masih tidak
                menerima email setelah beberapa menit, coba minta email
                verifikasi/reset kata sandi dikirim ulang. Jika masalah terus
                berlanjut, silakan hubungi tim dukungan kami untuk bantuan lebih
                lanjut.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                Bagaimana saya bisa mendapatkan dokumen hukum yang saya
                butuhkan?
              </div>
              <div className="collapse-content text-sm">
                Anda dapat melakukan proses login terlebih dahulu, kemudian Anda
                bisa mencari dokumen hukum yang Anda perlukan di navigasi
                Dokumen.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                Bagaimana cara menghubungi pengacara melalui website ini?
              </div>
              <div className="collapse-content text-sm">
                Anda dapat mengunjungi halaman Pengacara, di sana Anda
                akan menemukan daftar pengacara yang terdaftar di Justibot. 
                Klik pada profil pengacara yang Anda minati untuk melihat
                informasi kontak mereka. Anda dapat menghubungi mereka melalui
                whatsapp atau sosial media yang tertera di profil mereka.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_FAQ;

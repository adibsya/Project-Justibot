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
              Bagaimana cara membuat akun?
              </div>
              <div className="collapse-content text-sm">
              Klik tombol “Daftar” di pojok kanan atas dan ikuti proses pendaftaran.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
              Saya lupa kata sandi saya. Apa yang harus saya lakukan?
              </div>
              <div className="collapse-content text-sm">
              Klik “Lupa Kata Sandi” pada halaman login dan ikuti instruksi yang dikirimkan ke email Anda.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
              Bagaimana cara memperbarui informasi profil saya?
              </div>
              <div className="collapse-content text-sm">
              Buka pengaturan “Akun Saya” dan pilih “Edit Profil” untuk membuat perubahan.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                How do I create an account?
              </div>
              <div className="collapse-content text-sm">
                Click the "Sign Up" button in the top right corner and follow
                the registration process.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                I forgot my password. What should I do?
              </div>
              <div className="collapse-content text-sm">
                Click on "Forgot Password" on the login page and follow the
                instructions sent to your email.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100 border border-base-300 rounded-lg">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                How do I update my profile information?
              </div>
              <div className="collapse-content text-sm">
                Go to "My Account" settings and select "Edit Profile" to make
                changes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_FAQ;

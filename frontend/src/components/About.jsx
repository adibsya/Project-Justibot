import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-onPrimary text-[#3D2520]">
      <div className="relative w-full h-[400px] shadow-lg">
        <div className="absolute inset-0 bg-[#000000] bg-opacity-30"></div>
        <img
          src={assets.bg_aboutus}
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-10 rounded-xl mt-10">
        <h2 className="text-4xl font-bold text-[#612A22] mb-6 border-b-4 border-[#775F4E] inline-block pb-2">
          About Us
        </h2>
        <p className="text-lg leading-relaxed text-justify mb-6">
          JustiBot adalah aplikasi profesional yang dirancang untuk memberikan
          layanan konsultasi hukum berbasis AI, pembuatan dokumen hukum, dan
          akses mudah ke direktori pengacara. Sejak dikembangkan, JustiBot telah
          menjadi mitra terpercaya bagi pengguna yang membutuhkan solusi hukum
          cepat, akurat, dan mudah diakses.
        </p>
        <p className="text-lg leading-relaxed text-justify mb-6">
          Aplikasi ini menyediakan AI Chatbot yang mampu menjawab berbagai
          pertanyaan hukum secara instan, membantu pengguna memahami hak dan
          kewajiban mereka dengan jelas. Selain itu, fitur Document Generator
          memungkinkan pembuatan dokumen hukum seperti kontrak dan perjanjian
          secara otomatis, sehingga pengguna dapat menghemat waktu dan
          memastikan kepatuhan hukum. JustiBot juga menawarkan Lawyer Directory,
          yang memudahkan pengguna dalam menemukan dan menghubungi pengacara
          profesional sesuai dengan bidang keahlian mereka.
        </p>
        <p className="text-lg leading-relaxed text-justify">
          Dengan JustiBot, akses ke layanan hukum menjadi lebih praktis dan
          efisien, mendukung kebutuhan individu maupun bisnis dalam berbagai
          aspek hukum, kapan saja dan di mana saja.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#775F4E] text-white shadow-xl rounded-xl p-6 border border-[#3D2520] hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl font-semibold border-b-2 border-[#D9CEC5] pb-2">
            Visi
          </h3>
          <p className="mt-4 leading-relaxed text-justify">
            JustiBot adalah aplikasi profesional yang dirancang untuk memberikan
            layanan konsultasi hukum berbasis AI, pembuatan dokumen hukum, dan
            akses mudah ke direktori pengacara. Sejak dikembangkan, JustiBot
            telah menjadi mitra terpercaya bagi pengguna yang membutuhkan solusi
            hukum cepat, akurat, dan mudah diakses
          </p>
          <p className="mt-4 leading-relaxed text-justify">
            Aplikasi ini menyediakan AI Chatbot yang mampu menjawab berbagai
            pertanyaan hukum secara instan, membantu pengguna memahami hak dan
            kewajiban mereka dengan jelas. Selain itu, fitur Document Generator
            memungkinkan pembuatan dokumen hukum seperti kontrak dan perjanjian
            secara otomatis, sehingga pengguna dapat menghemat waktu dan
            memastikan kepatuhan hukum. JustiBot juga menawarkan Lawyer
            Directory, yang memudahkan pengguna dalam menemukan dan menghubungi
            pengacara profesional sesuai dengan bidang keahlian mereka.
          </p>
        </div>

        <div className="bg-[#775F4E] text-white shadow-xl rounded-xl p-6 border border-[#3D2520] hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl font-semibold border-b-2 border-[#D9CEC5] pb-2">
            Misi
          </h3>
          <p className="mt-4 leading-relaxed text-justify">
            JustiBot adalah aplikasi profesional yang dirancang untuk memberikan
            layanan konsultasi hukum berbasis AI, pembuatan dokumen hukum, dan
            akses mudah ke direktori pengacara. Sejak dikembangkan, JustiBot
            telah menjadi mitra terpercaya bagi pengguna yang membutuhkan solusi
            hukum cepat, akurat, dan mudah diakses.
          </p>
          <p className="mt-4 leading-relaxed text-justify">
            Aplikasi ini menyediakan AI Chatbot yang mampu menjawab berbagai
            pertanyaan hukum secara instan, membantu pengguna memahami hak dan
            kewajiban mereka dengan jelas. Selain itu, fitur Document Generator
            memungkinkan pembuatan dokumen hukum seperti kontrak dan perjanjian
            secara otomatis, sehingga pengguna dapat menghemat waktu dan
            memastikan kepatuhan hukum. JustiBot juga menawarkan Lawyer
            Directory, yang memudahkan pengguna dalam menemukan dan menghubungi
            pengacara profesional sesuai dengan bidang keahlian mereka.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;

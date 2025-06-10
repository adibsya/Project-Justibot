import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../../assets/assets";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const ForgotPassForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendLink = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post("/api/forgot-password", { email });
      console.log(response.data);
      setIsModalOpen(true);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengirim permintaan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOkClick = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="relative">
      {/* Fullscreen Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <ThreeDots
            height={80}
            width={80}
            color="#612A22"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </div>
      )}

      <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center lg:justify-end p-4 lg:pr-32 pt-24 lg:pt-0">
        <img
          src={assets.forgot1}
          alt="Forgot Password"
          className="w-80 sm:w-96 lg:w-auto lg:h-[500px] object-cover mb-8 lg:mb-0"
        />

        {/* Form */}
        <div className="w-full max-w-md sm:max-w-lg lg:w-[600px] p-8">
          <h2 className="text-3xl text-onSurface sm:text-5xl font-bold text-start">Lupa Kata Sandi Anda?</h2>
          <p className="text-gray-600 mt-4 mb-[55px]">
            Jangan khawatir. Kami akan mengatur ulang kata sandi Anda dan mengirimkan tautan untuk membuat kata sandi baru.
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form className="space-y-5" onSubmit={handleSendLink}>
            <div className="space-y-2 mb-[80px]">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Masukkan Alamat Email Anda"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[250px] py-2 px-4 bg-secondary hover:bg-secondary/80 text-white font-medium rounded-3xl transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? "Mengirim..." : "Kirim Tautan"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-40">
          <div className="bg-white p-6 rounded-3xl shadow-lg w-[500px] text-center relative">
            <img src={assets.forgot2} alt="Email Sent" className="mx-auto w-80 h-60" />
            <h3 className="text-xl text-onSurface font-semibold mt-4">Email telah dikirim!</h3>
            <p className="text-gray-600 mt-2">Kami telah mengirimkan tautan pengaturan ulang kata sandi ke email Anda.</p>
            <button
              className="mt-4 px-6 py-2 bg-secondary text-white rounded-3xl hover:bg-secondary/80 transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]"
              onClick={handleOkClick}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassForm;

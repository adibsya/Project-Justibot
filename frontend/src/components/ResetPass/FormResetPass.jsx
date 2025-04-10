import React, { useState, useEffect } from "react";
import assets from "../../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormResetPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams("");

  useEffect(() => {
    if (!token) {
      setError("Token tidak valid atau telah kedaluwarsa.");
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/reset-password",
        {
          token,
          password,
        },
      );

      if (response.status === 200) {
        setIsModalOpen(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat reset password.",
      );
    }
  };

  const handleOkClick = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div className='min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-end pr-32 py-24'
      style={{
        backgroundImage: `url(${assets.bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* FORM RESET PASSWORD */}
      <div className='h-[650px] w-[600px] p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg'>
        <h2 className='text-5xl text-onSurface font-bold text-start mb-[50px]'>Reset your password account here!</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
        <form className='space-y-5' onSubmit={handleResetPassword}>
          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Kata Sandi Baru
            </label>
            <input
              type='password'
              id='password'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700'
              placeholder='Masukkan Kata Sandi Baru Anda'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          <div className='space-y-2'>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700'
              placeholder='Konfirmasi Kata Sandi Baru Anda'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
  
          <div className='flex justify-center'>
            <button
              type='submit'
              className='w-[250px] py-2 px-4 bg-secondary hover:bg-secondary/80 text-white font-medium rounded-3xl transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02]'
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
  
      {/* MODAL SUCCESS RESET PASSWORD */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white p-6 rounded-3xl shadow-lg w-[500px] text-center relative">
            <img
              src={assets.logo_black} 
              alt="Success"
              className="mx-auto w-20 h-20"
            />
            <h3 className="text-xl text-onSurface font-semibold mt-4">Password Reset Successful!</h3>
            <p className="text-gray-600 mt-2">
              Your password has been updated. Please login with your new password.
            </p>
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

export default FormResetPass;

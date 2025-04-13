const VerifyFailed = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-secondary p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-white mb-4">❌ Verifikasi Gagal!</h1>
          <p className="text-white">Token verifikasi tidak valid atau sudah kedaluwarsa.</p>
          <a
            href="/register"
            className="inline-block mt-6 px-6 py-2 bg-accent/80 text-white rounded-full hover:bg-accent/60 transition"
          >
            Registrasi Ulang
          </a>
        </div>
      </div>
    );
  };
  
  export default VerifyFailed;
  
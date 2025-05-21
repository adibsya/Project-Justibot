import React, { useState } from "react";
import { motion } from "framer-motion";
import assets from "../../../assets/assets";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !description.trim()) return;

    setIsSubmitting(true);

    // Simulasi kirim API
    setTimeout(() => {
      console.log({ name, email, title, description });

      setIsSubmitting(false);
      setFeedbackSent(true);

      // Reset input
      setName("");
      setEmail("");
      setTitle("");
      setDescription("");

      // Sembunyikan pesan sukses setelah 3 detik
      setTimeout(() => {
        setFeedbackSent(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="text-onSurface bg-white py-12 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Bagian Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start"
        >
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            Punya ide artikel untuk kami publikasikan?
          </h2>
          <p className="text-onSurface/60 mb-6">
            Berikan ide Anda di kolom ini ya!
          </p>
          <img
            src={assets.idea}
            alt="Ilustrasi Ide Artikel"
            className="w-full max-w-md"
          />
        </motion.div>

        {/* Formulir */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="bg-secondary rounded-lg shadow-md p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-surface">
                Nama
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-surface">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-surface">
                Judul Artikel
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul artikel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-surface">
                Deskripsi Ide Artikel
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
                placeholder="Jelaskan ide artikel Anda..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-md bg-primary text-white font-medium transition-all hover:bg-opacity-90 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Usulan"}
            </button>

            {feedbackSent && (
              <div className="text-surface text-sm flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Terima kasih atas usulan Anda!
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;

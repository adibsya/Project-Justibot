import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi"; // Tambahkan ikon kirim
import assets from "../../assets/assets";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null); // Tambahkan referensi untuk container chat

  const generateBotResponse = (userMessage) => {
    // Logika sederhana untuk respons otomatis
    if (userMessage.toLowerCase().includes("hello")) {
      return "Hi there! How can I assist you today?";
    } else if (userMessage.toLowerCase().includes("help")) {
      return "Sure! Let me know what you need help with.";
    } else {
      return "I'm sorry, I didn't quite understand that. Could you rephrase?";
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = { text: message, sender: "user" };
      setChat([...chat, userMessage]); // Tambahkan pesan pengguna terlebih dahulu

      setMessage("");

      // Tambahkan delay untuk respons bot
      setTimeout(() => {
        const botMessage = {
          text: generateBotResponse(message),
          sender: "bot",
        };
        setChat((prevChat) => [...prevChat, botMessage]); // Tambahkan pesan bot setelah delay
      }, 1000); // Delay 1 detik
    }
  };

  useEffect(() => {
    // Scroll ke bagian bawah setiap kali chat diperbarui
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-10/12 flex flex-col py-20 text-textPrimary text-center">
        <h1 className="text-4xl font-bold mb-4 text-secondary">
          Find the Answer, Solve the Problem
        </h1>
        <p className="text-lg mb-8 text-textSecondary">
          Welcome to our chatbot! Here you can find answers to your questions
          and solve your problems efficiently. Our AI-powered chatbot is
          designed to assist you with a wide range of inquiries.
        </p>
        <div className="w-full bg-surface p-6 rounded-lg shadow-lg flex flex-col">
          <div
            ref={chatContainerRef} // Tambahkan referensi ke elemen ini
            className="flex-1 overflow-y-auto mb-4 max-h-80"
          >
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 my-2 rounded-lg text-sm max-w-xs break-words ${
                    msg.sender === "user"
                      ? "bg-primary text-onPrimary"
                      : "bg-muted text-textPrimary"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 p-3 border border-muted rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="p-3 bg-primary text-onPrimary rounded-r-lg flex items-center justify-center hover:bg-secondary transition"
              onClick={handleSendMessage}
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chatbot;

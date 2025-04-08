import React, { useState } from "react";
import assets from "../assets/assets";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChat([...chat, { text: message, sender: "user" }]);
      setMessage("");
      // Here you would typically send the message to your chatbot backend
    }
  };

  return (
    <main className="min-h-screen bg-onPrimary flex flex-col items-center">
      <div className="max-w-xl flex flex-col py-20 text-onSurface text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find the answer, solve the problem
        </h1>
        <p className="text-xl mb-8">
          Welcome to our chatbot! Here you can find answers to your questions
          and solve your problems efficiently. Our AI-powered chatbot is
          designed to assist you with a wide range of inquiries.
        </p>
        <div className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-200 self-end"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Ask a question"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-r-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chatbot;

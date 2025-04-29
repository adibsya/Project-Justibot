import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios"; // Import axios for API calls

const ChatbotHandler = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const chatContainerRef = useRef(null);

  // Fungsi untuk memformat teks respons chatbot
  const renderFormattedText = (text) => {
    if (!text) return "";

    // Helper function to format text with bold and italic
    const formatText = (text) => {
      // First, split by bold markers
      const boldParts = text.split(/\*\*(.*?)\*\*/);

      return boldParts.map((part, index) => {
        // Every odd index is bold text
        if (index % 2 === 1) {
          return <strong key={index}>{part}</strong>;
        }

        // Process italic for non-bold parts
        const italicParts = part.split(/\*(.*?)\*/);

        if (italicParts.length === 1) {
          return part;
        }

        return italicParts.map((italicPart, iIndex) => {
          // Every odd index is italic text
          if (iIndex % 2 === 1) {
            return <em key={`${index}-${iIndex}`}>{italicPart}</em>;
          }
          return italicPart;
        });
      });
    };

    // Memisahkan teks menjadi paragraf
    const paragraphs = text.split("\n\n");

    return (
      <div className="whitespace-pre-line">
        {paragraphs.map((paragraph, index) => {
          // Format headings
          if (paragraph.startsWith("###")) {
            return (
              <h3 key={index} className="text-lg font-bold mt-3 mb-2">
                {paragraph.replace(/^###\s*/, "")}
              </h3>
            );
          }

          if (paragraph.startsWith("##")) {
            return (
              <h2 key={index} className="text-xl font-bold mt-4 mb-2">
                {paragraph.replace(/^##\s*/, "")}
              </h2>
            );
          }

          if (paragraph.startsWith("#")) {
            return (
              <h1 key={index} className="text-2xl font-bold mt-4 mb-3">
                {paragraph.replace(/^#\s*/, "")}
              </h1>
            );
          }

          // Format lists
          if (paragraph.includes("\n- ") || paragraph.includes("\n* ")) {
            const listItems = paragraph.split(/\n[*-]\s/).filter(Boolean);
            const title = listItems[0];
            const items = listItems.slice(1);

            return (
              <div key={index} className="mb-3">
                <p className="mb-1">{formatText(title)}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {items.map((item, i) => (
                    <li key={i}>{formatText(item)}</li>
                  ))}
                </ul>
              </div>
            );
          }

          // Default paragraph formatting
          return (
            <p key={index} className="mb-3">
              {formatText(paragraph)}
            </p>
          );
        })}
      </div>
    );
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage = { text: message, sender: "user" };
      setChat([...chat, userMessage]); // Add user message immediately

      // Show loading indicator
      setIsLoading(true);
      setChat((prevChat) => [
        ...prevChat,
        { text: "...", sender: "bot", isLoading: true },
      ]);

      // Clear input field
      const sentMessage = message;
      setMessage("");

      try {
        console.log("Sending message:", sentMessage);
        const response = await axios.post("/api/chatbot", {
          message: sentMessage,
        });
        console.log("Response received:", response.data);

        // Remove loading message and add real response
        setChat((prevChat) => {
          const filteredChat = prevChat.filter((msg) => !msg.isLoading);
          return [
            ...filteredChat,
            {
              text: response.data.response,
              sender: "bot",
            },
          ];
        });
      } catch (error) {
        console.error("Error calling chatbot API:", error);
        console.error("Error details:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config,
        });

        // Remove loading message and add error message
        setChat((prevChat) => {
          const filteredChat = prevChat.filter((msg) => !msg.isLoading);
          return [
            ...filteredChat,
            {
              text: `Error: ${error.message}. ${error.response?.data?.error || ""}`,
              sender: "bot",
              isError: true,
            },
          ];
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Scroll to bottom when chat updates
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95 flex flex-col items-center">
      <div className="w-full mt-12 max-w-4xl px-4 md:px-8 flex flex-col py-4 md:py-8 text-textPrimary">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-secondary text-center">
          Find the Answer, Solve the Problem
        </h1>
        <p className="text-sm md:text-base mb-4 text-textSecondary text-center max-w-2xl mx-auto">
          Welcome to our chatbot! Here you can find answers to your questions
          and solve your problems efficiently.
        </p>

        <div className="w-full bg-surface p-3 md:p-4 rounded-xl shadow-lg flex flex-col h-[calc(100vh-180px)] md:h-[80vh]">
          {/* Chat messages container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-3 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
          >
            {chat.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-textSecondary text-center p-6">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-muted/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <p className="text-lg font-medium">Start Your Conversation</p>
                  <p className="mt-1">
                    Ask me anything about legal information or assistance
                  </p>
                </div>
              </div>
            ) : (
              chat.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2 shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.051l.884.443c.394.197.917.197 1.311 0l.884-.443a2.25 2.25 0 001.357-2.051V3.104c-1.067-.086-2.685-.086-4.5-.086zM14.25 3.104c.251.023.501.05.75.082M19.8 2.207a9 9 0 00-.8.173m-1.995.565c.7.066 1.347.174 1.995.322M3.207 15.196l8.25 4.99c.122.074.255.11.387.11.132 0 .265-.036.387-.11l8.25-4.99"
                        />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`p-3 my-1 rounded-2xl text-sm md:text-base max-w-[75%] break-words ${
                      msg.sender === "user"
                        ? "bg-primary text-onPrimary rounded-tr-none shadow-sm"
                        : msg.isLoading
                          ? "bg-muted/50 text-textPrimary"
                          : msg.isError
                            ? "bg-red-100 text-red-600 rounded-tl-none"
                            : "bg-muted/50 text-textPrimary rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.isLoading ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-150"></div>
                      </div>
                    ) : // Apply custom formatting for bot messages
                    msg.sender === "user" ? (
                      msg.text
                    ) : (
                      renderFormattedText(msg.text)
                    )}
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center ml-2 shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Input area */}
          <div className="flex items-center bg-muted/20 p-2 rounded-lg border border-muted/30">
            <input
              type="text"
              className="flex-1 p-2 md:p-3 bg-transparent rounded-lg focus:outline-none placeholder:text-textSecondary/60"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
            />
            <button
              className={`p-2 md:p-3 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-secondary transform hover:scale-105"
              } text-onPrimary rounded-lg flex items-center justify-center transition-all duration-200 ml-2`}
              onClick={handleSendMessage}
              disabled={isLoading}
              aria-label="Send message"
            >
              <FiSend size={18} />
            </button>
          </div>
          <div className="text-xs text-textSecondary/50 text-center mt-1">
            Powered by JustiBot AI • Questions? Contact support
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatbotHandler;

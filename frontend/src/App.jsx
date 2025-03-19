import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Document from "./pages/Document";
import Chatbot from "./pages/Chatbot";
import Lawyer from "./pages/Lawyer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <div className="w-full h-full absoulute">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/document" element={<Document />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/lawyer" element={<Lawyer />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

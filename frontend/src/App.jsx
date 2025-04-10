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
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPass from "./pages/ForgotPassword";
import ResetPass from "./pages/ResetPassword";
import Artikel from "./components/Blog/Artikel";
import Profile from "./components/Lawyer/Profile";
import VerifySuccess from "./pages/VerifySuccess";
import VerifyFailed from "./pages/VerifyFailed";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password/:token" element={<ResetPass />} />
        <Route path="/artikel/:id" element={<Artikel />} />
        <Route path="/lawyer-profile/1" element={<Profile />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/verify-failed" element={<VerifyFailed />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

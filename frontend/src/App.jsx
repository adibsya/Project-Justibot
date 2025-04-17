import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages
import Home from "./pages/User/Home";
import Document from "./pages/User/Document";
import Chatbot from "./pages/User/Chatbot";
import Lawyer from "./pages/User/Lawyer";
import About from "./components/About";
import Blog from "./pages/User/Blog";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import ForgotPass from "./pages/User/ForgotPassword";
import ResetPass from "./pages/User/ResetPassword";
import Artikel from "./components/User/Blog/Artikel";
import Profile from "./components/User/Lawyer/Profile";
import VerifySuccess from "./pages/User/VerifySuccess";
import VerifyFailed from "./pages/User/VerifyFailed";
import PerjanjianKerjaSama from "./components/User/Document/PerjanjianKerjaSama";

// Admin Pages
import DashboardAdmin from "./pages/Admin/Dashboard";
import Articles from "./components/Admin/Articles/DataArticles";
import ChatbotAdmin from "./components/Admin/Chatbot/ChatbotAnalysis";
import DataLawyers from "./components/Admin/Lawyers/DataLawyers";

const App = () => {
  return (
    <Routes>
      {/* User Layout */}
      <Route element={<UserLayout />}>
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
        <Route
          path="/perjanjian-kerja-sama"
          element={<PerjanjianKerjaSama />}
        />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="articles" element={<Articles />} />
        <Route path="lawyers" element={<DataLawyers />} />
        <Route path="chatbot-analysis" element={<ChatbotAdmin />} />
      </Route>
    </Routes>
  );
};

export default App;

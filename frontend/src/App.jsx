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
// import PerjanjianKerjaSama from "./components/User/Document/PerjanjianKerjaSama";

// Admin Pages
import DashboardAdmin from "./pages/Admin/DashboardData";
import AdminDocumentation from "./pages/Admin/AdminDocumentation";
import Articles from "./pages/Admin/ArticlesData";
import ChatbotAdmin from "./pages/Admin/ChatbotData";
import DataLawyers from "./pages/Admin/LawyersData";
import FormTambahLawyer from "./pages/Admin/AddLawyers";
import EditLawyers from "./pages/Admin/EditLawyers";
import FormTambahArtikel from "./pages/Admin/AddArticles";
import FormEditArtikel from "./pages/Admin/EditArticles";
import DocumentManagement from "./pages/Admin/DocumentManagement";

const App = () => {
  return (
    <Routes>
      {/* User Routes */}
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
        <Route path="/lawyer/:id" element={<Profile />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/verify-failed" element={<VerifyFailed />} />
        {/* <Route
          path="/perjanjian-kerja-sama"
          element={<PerjanjianKerjaSama />}
        /> */}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="documentation" element={<AdminDocumentation />} />
        <Route path="articles" element={<Articles />} />
        <Route path="lawyers" element={<DataLawyers />} />
        <Route path="lawyers/tambah" element={<FormTambahLawyer />} />
        <Route path="lawyers/edit/:id" element={<EditLawyers />} />
        <Route path="articles/tambah" element={<FormTambahArtikel />} />
        <Route path="/admin/articles/edit/:id" element={<FormEditArtikel />} />
        <Route path="StatistikChatbot" element={<ChatbotAdmin />} />
        <Route path="document-management" element={<DocumentManagement />} />
      </Route>
    </Routes>
  );
};

export default App;

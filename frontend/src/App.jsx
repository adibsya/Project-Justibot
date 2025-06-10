import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true; // ⬅️ WAJIB untuk kirim cookie
axios.defaults.baseURL = "http://localhost:5173";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ScrollToTop from "./components/ScrollToTop";

// User Pages
import Home from "./pages/User/Home";
import Document from "./pages/User/Document";
import Chatbot from "./pages/User/Chatbot";
import Lawyer from "./pages/User/Lawyer";
import AboutUs from "./pages/User/AboutUs";
import Blog from "./pages/User/Blog";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import ForgotPass from "./pages/User/ForgotPassword";
import ResetPass from "./pages/User/ResetPassword";
import Artikel from "./components/User/Blog/Artikel";
import Profile from "./components/User/Lawyer/Profile";
import UserProfile from "./pages/User/UserProfilePage";
import VerifySuccess from "./pages/User/VerifySuccess";
import VerifyFailed from "./pages/User/VerifyFailed";
import PerjanjianKerjaSama from "./components/User/Document/PerjanjianKerjaSama";
import ArtikelPerdataPage from "./pages/User/ArtikelPerdataPage";
import ArtikelBisnisEkonomiPage from "./pages/User/ArtikelBisnisEkonomiPage";
import ArtikelLingkunganPage from "./pages/User/ArtikelLingkunganPage";
import ArtikelPidanaPage from "./pages/User/ArtikelPidanaPage";
import ArtikelIslamPage from "./pages/User/ArtikelIslamPage";
import SyaratKetentuanPage from "./pages/User/SyaratKetentuanPage";
import KebijakanPrivasiPage from "./pages/User/KebijakanPrivasiPage";

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
import DataAdmin from "./pages/Admin/DataAdmin";
import TambahAdmin from "./pages/Admin/AddAdmin";
import EditAdmin from "./pages/Admin/EditAdmin";
import AdminProfile from "./pages/Admin/AdminProfilePage";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/document" element={<Document />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/lawyer" element={<Lawyer />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/artikel" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/reset-password/:token" element={<ResetPass />} />
          <Route path="/artikel/:id" element={<Artikel />} />
          <Route path="/lawyer/:nama" element={<Profile />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/verify-failed" element={<VerifyFailed />} />
          {/* <Route
          path="/perjanjian-kerja-sama"
          element={<PerjanjianKerjaSama />}
        /> */}
          <Route
            path="/perjanjian-kerja-sama"
            element={<PerjanjianKerjaSama />}
          />
          <Route
            path="/artikel/artikel-pidana"
            element={<ArtikelPidanaPage />}
          />
          <Route
            path="/artikel/artikel-perdata"
            element={<ArtikelPerdataPage />}
          />
          <Route
            path="/artikel/artikel-lingkungan"
            element={<ArtikelLingkunganPage />}
          />
          <Route
            path="/artikel/artikel-bisnis-dan-ekonomi"
            element={<ArtikelBisnisEkonomiPage />}
          />
          <Route path="/artikel/artikel-islam" element={<ArtikelIslamPage />} />
          <Route
            path="/syarat-dan-ketentuan"
            element={<SyaratKetentuanPage />}
          />
          <Route path="/kebijakan-privasi" element={<KebijakanPrivasiPage />} />
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
          <Route
            path="/admin/articles/edit/:id"
            element={<FormEditArtikel />}
          />
          <Route path="StatistikChatbot" element={<ChatbotAdmin />} />
          <Route path="document-management" element={<DocumentManagement />} />
          <Route path="TambahAdmin" element={<TambahAdmin />} />
          <Route path="DataAdmin" element={<DataAdmin />} />
          <Route path="admin/tambahadmin/edit/:id" element={<editAdmin />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

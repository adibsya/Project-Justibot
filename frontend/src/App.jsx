import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true; // ⬅️ WAJIB untuk kirim cookie
axios.defaults.baseURL = "http://localhost:5173";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import PengacaraLayout from "./layouts/PengacaraLayout";
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
import DaftarKantorPage from "./pages/User/daftarKantorPage";

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
import FormKantorPage from "./pages/User/FormKantorPage";
import KantorApproval from "./pages/Admin/ApproveKantor";
import FormPendaftaranLawyer from "./components/User/Lawyer/FormPendaftaranLawyer";
import ApprovePengacara from "./pages/Admin/ApprovePengacara";

// Pengacara Pages
import DashboardPengacara from "./pages/Pengacara/Dashboard";
import ArticlesData from "./pages/Pengacara/ArticlesData";
import FormTambahArtikelPengacara from "./pages/Pengacara/AddArticles";
import FormEditArtikelPengacara from "./pages/Pengacara/EditArticles";
import DataDiriPengacara from "./pages/Pengacara/DataDiriPengacara";
import DokumentasiPengacara from "./pages/Pengacara/PengacaraDocumentation";

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
          <Route path="/daftar-kantor" element={<DaftarKantorPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/reset-password/:token" element={<ResetPass />} />
          <Route path="/artikel/:id" element={<Artikel />} />
          <Route path="/lawyer/:nama" element={<Profile />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/verify-failed" element={<VerifyFailed />} />
          <Route path="/FormPendaftaranKantor" element={<FormKantorPage />} />
          <Route path="/FormPendaftaranLawyer" element={<FormPendaftaranLawyer />} />
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
          <Route path="kantor-approval" element={<KantorApproval />} />
          <Route path="DataAdmin" element={<DataAdmin />} />
          <Route path="dataadmin/edit/:id" element={<EditAdmin />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="approve-pengacara" element={<ApprovePengacara />} />
        </Route>

        {/* Pengacara Routes */}
        <Route path="/pengacara" element={<PengacaraLayout />}>
          <Route path="dashboard" element={<DashboardPengacara />} />
          <Route path="articles" element={<ArticlesData />} />
          <Route
            path="articles/tambah"
            element={<FormTambahArtikelPengacara />}
          />
          <Route
            path="articles/edit/:id"
            element={<FormEditArtikelPengacara />}
          />
          <Route path="data-diri" element={<DataDiriPengacara />} />
          <Route
            path="documentation"
            element={<DokumentasiPengacara />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;

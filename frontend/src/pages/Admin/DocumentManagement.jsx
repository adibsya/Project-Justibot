import React, { useState, useEffect } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaEye,
  FaFilter,
} from "react-icons/fa";
import { FiX, FiCheck, FiUpload, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const DocumentManagement = () => {
  // State for document list and operations
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // State for modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add, edit, delete
  const [currentDocument, setCurrentDocument] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "perjanjian",
    files: {
      docx: { url: "", size: "" },
      pdf: { url: "", size: "" },
      thumbnail: { url: "", size: "" }, // Add thumbnail property
    },
    pages: 0,
  });

  // Add state for thumbnail file
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // Upload state
  const [docxFile, setDocxFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [docxUploadProgress, setDocxUploadProgress] = useState(0);
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [notification, setNotification] = useState(null);

  // Categories for filtering and form
  const [categories, setCategories] = useState([
    { id: "all", name: "Semua Dokumen" },
    { id: "perjanjian", name: "Perjanjian" },
    { id: "surat resmi", name: "Surat Resmi" },
    { id: "bisnis", name: "Dokumen Bisnis" },
    { id: "perorangan", name: "Dokumen Perorangan" },
  ]);

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  // Fetch documents from API
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/documents");
      const result = await response.json();

      if (result.success) {
        setDocuments(result.data);
      } else {
        setError(result.message || "Failed to load documents");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/documents/public/categories");
      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Filter documents based on search query and active category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // CRUD Operations
  const handleCreate = async () => {
    try {
      // Create FormData object to handle file uploads
      const formDataObj = new FormData();

      // Add text fields
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("category", formData.category);
      formDataObj.append("pages", formData.pages);

      // Add files if they exist
      if (docxFile) {
        formDataObj.append("docxFile", docxFile);
      }

      if (pdfFile) {
        formDataObj.append("pdfFile", pdfFile);
      }

      // Add thumbnail if it exists
      if (thumbnailFile) {
        formDataObj.append("thumbnailFile", thumbnailFile);
      }

      // Send request to create document
      const response = await fetch("/api/documents", {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (result.success) {
        // Add new document to state
        setDocuments([...documents, result.data]);
        closeModal();
        showNotification("Dokumen berhasil ditambahkan");
      } else {
        showNotification(`Error: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Error creating document:", error);
      showNotification(
        "Gagal menambahkan dokumen. Silakan coba lagi.",
        "error",
      );
    }
  };

  const handleUpdate = async () => {
    if (!currentDocument) return;

    try {
      // Create FormData object for file uploads
      const formDataObj = new FormData();

      // Add text fields
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("category", formData.category);
      formDataObj.append("pages", formData.pages);

      // Add files if new ones were selected
      if (docxFile) {
        formDataObj.append("docxFile", docxFile);
      }

      if (pdfFile) {
        formDataObj.append("pdfFile", pdfFile);
      }

      // Add thumbnail if a new one was selected
      if (thumbnailFile) {
        formDataObj.append("thumbnailFile", thumbnailFile);
      }

      // Send request to update document
      const response = await fetch(`/api/documents/${currentDocument.id}`, {
        method: "PUT",
        body: formDataObj,
      });

      const result = await response.json();

      if (result.success) {
        // Update document in state
        const updatedDocuments = documents.map((doc) => {
          if (doc.id === currentDocument.id) {
            return result.data;
          }
          return doc;
        });

        setDocuments(updatedDocuments);
        closeModal();
        showNotification("Dokumen berhasil diperbarui");
      } else {
        showNotification(`Error: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      showNotification(
        "Gagal memperbarui dokumen. Silakan coba lagi.",
        "error",
      );
    }
  };

  const handleDelete = async () => {
    if (!currentDocument) return;

    try {
      const response = await fetch(`/api/documents/${currentDocument.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        // Remove document from state
        const updatedDocuments = documents.filter(
          (doc) => doc.id !== currentDocument.id,
        );

        setDocuments(updatedDocuments);
        closeModal();
        showNotification("Dokumen berhasil dihapus");
      } else {
        showNotification(`Error: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      showNotification("Gagal menghapus dokumen. Silakan coba lagi.", "error");
    }
  };

  // File upload handling
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Set file for preview
    if (fileType === "docx") {
      setDocxFile(file);
      // Update form data with file information
      setFormData({
        ...formData,
        files: {
          ...formData.files,
          docx: {
            url: URL.createObjectURL(file),
            size: `${Math.round(file.size / 1024)} KB`,
          },
        },
      });
      simulateUploadProgress(setDocxUploadProgress);
    } else if (fileType === "pdf") {
      setPdfFile(file);
      // Update form data with file information
      setFormData({
        ...formData,
        files: {
          ...formData.files,
          pdf: {
            url: URL.createObjectURL(file),
            size: `${Math.round(file.size / 1024)} KB`,
          },
        },
      });
      simulateUploadProgress(setPdfUploadProgress);
    } else if (fileType === "thumbnail") {
      setThumbnailFile(file);
      // Update form data with thumbnail information
      setFormData({
        ...formData,
        files: {
          ...formData.files,
          thumbnail: {
            url: URL.createObjectURL(file),
            size: `${Math.round(file.size / 1024)} KB`,
          },
        },
      });
      simulateUploadProgress(setThumbnailUploadProgress);
    }
  };

  // Update the simulateUploadProgress function to accept a setter
  const simulateUploadProgress = (progressSetter) => {
    progressSetter(0);
    const interval = setInterval(() => {
      progressSetter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Modal handling
  const openModal = (mode, document = null) => {
    setModalMode(mode);
    setCurrentDocument(document);

    if (mode === "add") {
      setFormData({
        title: "",
        description: "",
        category: "perjanjian",
        files: {
          docx: { url: "", size: "" },
          pdf: { url: "", size: "" },
          thumbnail: { url: "", size: "" }, // Initialize thumbnail
        },
        pages: 0,
      });
    } else if (mode === "edit" && document) {
      setFormData({
        title: document.title,
        description: document.description,
        category: document.category,
        files: {
          docx: document.files.docx || { url: "", size: "" },
          pdf: document.files.pdf || { url: "", size: "" },
          thumbnail: document.files.thumbnail || { url: "", size: "" }, // Handle existing thumbnail
        },
        pages: document.pages,
      });
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDocument(null);
    setDocxFile(null);
    setPdfFile(null);
    setThumbnailFile(null); // Reset thumbnail file
  };

  // Form handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 ${
                notification.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              <span>
                {notification.type === "error" ? (
                  <FiAlertCircle className="w-5 h-5" />
                ) : (
                  <FiCheck className="w-5 h-5" />
                )}
              </span>
              <p>{notification.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="mb-6 flex flex-col gap-2 justify-center items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2 flex items-center">
            Manajemen Dokumen
          </h1>
          <p className="text-textSecondary">
            Kelola seluruh dokumen yang tersedia di aplikasi JustiBot
          </p>
        </header>

        {/* Action bar */}
        <div className="flex flex-col gap-4 mb-6 bg-surface p-4 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Search */}
            <div className="w-full sm:w-auto flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-textSecondary/60" />
              </div>
              <input
                type="text"
                placeholder="Cari dokumen..."
                className="pl-10 pr-4 py-2.5 w-full bg-background border border-muted/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-8 self-end sm:self-auto">
              {/* Filter toggle for mobile */}
              <button
                className="md:hidden flex items-center gap-2 px-3 py-2 bg-muted/40 text-onSurface/70 rounded-lg hover:bg-muted/30 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter />
                <span>Filter</span>
              </button>

              {/* Add button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-onPrimary rounded-lg hover:bg-secondary transition-all shadow-sm"
                onClick={() => openModal("add")}
              >
                <FaPlus />
                <span>Tambah Dokumen</span>
              </motion.button>
            </div>
          </div>

          {/* Category filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden md:block"
              >
                <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-2 text-sm rounded-full transition-all ${
                        activeCategory === category.id
                          ? "bg-secondary text-onPrimary font-medium shadow-sm"
                          : "bg-muted/20 hover:bg-muted/30 text-onSurface/70"
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Document list */}
        <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-4 text-textSecondary">Memuat dokumen...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="bg-red-100 text-red-600 p-3 rounded-full mb-3">
                <FiAlertCircle size={24} />
              </div>
              <h3 className="text-lg font-medium mb-1">Error</h3>
              <p className="text-textSecondary text-center">{error}</p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-onPrimary rounded-lg hover:bg-secondary transition-colors"
                onClick={fetchDocuments}
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <>
              {/* Mobile document cards */}
              <div className="md:hidden divide-y divide-muted/20">
                {filteredDocuments.length === 0 ? (
                  <div className="p-6 text-center text-textSecondary">
                    <div className="bg-muted/20 inline-block p-3 rounded-full mb-2">
                      <FaSearch className="text-textSecondary/60" size={20} />
                    </div>
                    <p>Tidak ada dokumen yang ditemukan</p>
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium text-textPrimary">
                          {doc.title}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            className="p-1.5 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                            onClick={() => openModal("edit", doc)}
                            title="Edit"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            className="p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            onClick={() => openModal("delete", doc)}
                            title="Hapus"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-textSecondary mb-3 line-clamp-2">
                        {doc.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="px-2 py-1 text-xs rounded-full bg-muted/20">
                          {categories.find((c) => c.id === doc.category)
                            ?.name || doc.category}
                        </span>

                        <div className="flex items-center ml-auto space-x-3">
                          <div className="flex items-center text-textSecondary/70 text-xs">
                            <FaEye className="mr-1" size={12} />
                            <span>{doc.views?.toLocaleString() || 0}</span>
                          </div>

                          <div className="flex space-x-1">
                            {doc.files.docx && (
                              <span className="p-1 rounded bg-blue-100 text-blue-600">
                                <FaFileWord size={12} />
                              </span>
                            )}
                            {doc.files.pdf && (
                              <span className="p-1 rounded bg-red-100 text-red-600">
                                <FaFilePdf size={12} />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/20 text-left">
                    <tr>
                      <th className="px-4 py-3 text-onSurface font-semibold">
                        Judul
                      </th>
                      <th className="px-4 py-3 text-onSurface font-semibold">
                        Kategori
                      </th>
                      <th className="px-4 py-3 text-onSurface font-semibold">
                        Hal.
                      </th>
                      <th className="px-4 py-3 text-onSurface font-semibold">
                        Dilihat
                      </th>
                      <th className="px-4 py-3 text-onSurface font-semibold">
                        Format
                      </th>
                      <th className="px-4 py-3 text-onSurface font-semibold">
                        Diperbarui
                      </th>
                      <th className="px-4 py-3 text-onSurface font-semibold">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/20">
                    {filteredDocuments.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-4 py-12 text-center text-textSecondary"
                        >
                          <div className="flex flex-col items-center">
                            <div className="bg-muted/20 p-3 rounded-full mb-2">
                              <FaSearch
                                className="text-textSecondary/60"
                                size={20}
                              />
                            </div>
                            <p>Tidak ada dokumen yang ditemukan</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredDocuments.map((doc) => (
                        <motion.tr
                          key={doc.id}
                          className="hover:bg-muted/10 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-textPrimary">
                                {doc.title}
                              </p>
                              <p className="text-xs text-textSecondary line-clamp-1">
                                {doc.description}
                              </p>
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs rounded-full bg-muted/20">
                              {categories.find((c) => c.id === doc.category)
                                ?.name || doc.category}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-textSecondary">
                            {doc.pages}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center text-textSecondary">
                              <FaEye className="mr-1.5" size={14} />
                              <span>{doc.views?.toLocaleString() || 0}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              {doc.files.docx && (
                                <span className="p-1.5 rounded bg-blue-100 text-blue-600 transform transition-transform hover:scale-110">
                                  <FaFileWord size={14} />
                                </span>
                              )}
                              {doc.files.pdf && (
                                <span className="p-1.5 rounded bg-red-100 text-red-600 transform transition-transform hover:scale-110">
                                  <FaFilePdf size={14} />
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-textSecondary text-sm">
                            {new Date(doc.updatedAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                onClick={() => openModal("edit", doc)}
                                title="Edit"
                              >
                                <FaEdit size={14} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                onClick={() => openModal("delete", doc)}
                                title="Hapus"
                              >
                                <FaTrash size={14} />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal for add/edit/delete */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="p-4 border-b border-muted/20 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-secondary">
                  {modalMode === "add"
                    ? "Tambah Dokumen Baru"
                    : modalMode === "edit"
                      ? "Edit Dokumen"
                      : "Hapus Dokumen"}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full hover:bg-muted/20"
                  onClick={closeModal}
                >
                  <FiX />
                </motion.button>
              </div>

              {/* Modal content */}
              <div className="p-4 overflow-y-auto max-h-[calc(90vh-130px)]">
                {modalMode === "delete" ? (
                  <div className="text-center py-6">
                    <motion.div
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="mx-auto bg-red-100 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    >
                      <FaTrash size={24} />
                    </motion.div>
                    <h3 className="text-lg font-medium mb-2">
                      Konfirmasi Penghapusan
                    </h3>
                    <p className="text-textSecondary mb-4">
                      Apakah Anda yakin ingin menghapus dokumen <br />
                      <span className="font-semibold text-textPrimary">
                        "{currentDocument?.title}"
                      </span>
                      ?
                    </p>
                    <p className="text-sm text-red-500 mb-4">
                      Tindakan ini tidak dapat dibatalkan.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Document basic info */}
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-1">
                        Judul Dokumen
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2.5 border border-muted/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        placeholder="Masukkan judul dokumen"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-1">
                        Deskripsi
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2.5 border border-muted/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 h-24 transition-all"
                        placeholder="Masukkan deskripsi dokumen"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-textSecondary mb-1">
                          Kategori
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full p-2.5 border border-muted/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        >
                          <option value="perjanjian kerja sama">
                            Perjanjian Kerja Sama
                          </option>
                          <option value="surat resmi">Surat Resmi</option>
                          <option value="bisnis">Dokumen Bisnis</option>
                          <option value="gugatan">Gugatan</option>
                          <option value="perizinan">Perizinan</option>
                          <option value="ketenagakerjaan">
                            Ketenagakerjaan
                          </option>
                          <option value="konsumen">
                            Perlindungan Konsumen
                          </option>
                          <option value="perusahaan">Hukum Perusahaan</option>
                          <option value="waris">Waris</option>
                          <option value="pidana">Hukum Pidana</option>
                          <option value="pajak">Perpajakan</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-textSecondary mb-1">
                          Jumlah Halaman
                        </label>
                        <input
                          type="number"
                          name="pages"
                          value={formData.pages}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full p-2.5 border border-muted/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* File uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* DOCX upload */}
                      <div className="border border-muted/40 rounded-lg p-4 transition-all hover:border-primary/30">
                        <label className="block text-sm font-medium text-textSecondary mb-2">
                          File DOCX
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-center h-32 border-2 border-dashed border-muted/40 rounded-lg bg-muted/10 relative"
                        >
                          {docxFile || formData.files.docx.url ? (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-center"
                            >
                              <FaFileWord
                                size={32}
                                className="mx-auto mb-2 text-blue-500"
                              />
                              <p className="text-sm font-medium text-textPrimary">
                                {docxFile
                                  ? docxFile.name
                                  : formData.files.docx.url.split("/").pop()}
                              </p>
                              <p className="text-xs text-textSecondary">
                                {formData.files.docx.size}
                              </p>
                            </motion.div>
                          ) : (
                            <div className="text-center">
                              <FiUpload
                                className="mx-auto mb-2 text-textSecondary"
                                size={24}
                              />
                              <p className="text-sm text-textSecondary">
                                Klik untuk unggah file DOCX ke sini. Maksimal 10
                                MB
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept=".docx,.doc"
                            onChange={(e) => handleFileChange(e, "docx")}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </motion.div>
                        {docxUploadProgress > 0 && docxUploadProgress < 100 && (
                          <div className="w-full bg-muted/20 rounded-full h-2 mt-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${docxUploadProgress}%` }}
                              className="bg-primary h-2 rounded-full"
                            ></motion.div>
                          </div>
                        )}
                      </div>
                      {/* PDF upload */}
                      <div className="border border-muted/40 rounded-lg p-4 transition-all hover:border-primary/30">
                        <label className="block text-sm font-medium text-textSecondary mb-2">
                          File PDF
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-center h-32 border-2 border-dashed border-muted/40 rounded-lg bg-muted/10 relative"
                        >
                          {pdfFile || formData.files.pdf.url ? (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-center"
                            >
                              <FaFilePdf
                                size={32}
                                className="mx-auto mb-2 text-red-500"
                              />
                              <p className="text-sm font-medium text-textPrimary">
                                {pdfFile
                                  ? pdfFile.name
                                  : formData.files.pdf.url.split("/").pop()}
                              </p>
                              <p className="text-xs text-textSecondary">
                                {formData.files.pdf.size}
                              </p>
                            </motion.div>
                          ) : (
                            <div className="text-center">
                              <FiUpload
                                className="mx-auto mb-2 text-textSecondary"
                                size={24}
                              />
                              <p className="text-sm text-textSecondary">
                                Klik untuk unggah file PDF ke sini. Maksimal 10
                                MB
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileChange(e, "pdf")}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </motion.div>
                        {pdfUploadProgress > 0 && pdfUploadProgress < 100 && (
                          <div className="w-full bg-muted/20 rounded-full h-2 mt-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pdfUploadProgress}%` }}
                              className="bg-primary h-2 rounded-full"
                            ></motion.div>
                          </div>
                        )}
                      </div>

                      <div className="border border-muted/40 rounded-lg p-4 transition-all hover:border-primary/30">
                        <label className="block text-sm font-medium text-textSecondary mb-2">
                          Thumbnail Gambar
                        </label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-center h-32 border-2 border-dashed border-muted/40 rounded-lg bg-muted/10 relative"
                        >
                          {thumbnailFile || formData.files.thumbnail.url ? (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-center w-full h-full relative"
                            >
                              <img
                                src={
                                  thumbnailFile
                                    ? URL.createObjectURL(thumbnailFile)
                                    : formData.files.thumbnail.url
                                }
                                alt="Thumbnail preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                <p className="text-white text-sm">
                                  Klik untuk mengubah
                                </p>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="text-center">
                              <FiUpload
                                className="mx-auto mb-2 text-textSecondary"
                                size={24}
                              />
                              <p className="text-sm text-textSecondary">
                                Klik untuk unggah gambar thumbnail. Maksimal 10
                                MB
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "thumbnail")}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </motion.div>
                        {thumbnailUploadProgress > 0 &&
                          thumbnailUploadProgress < 100 && (
                            <div className="w-full bg-muted/20 rounded-full h-2 mt-3">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${thumbnailUploadProgress}%`,
                                }}
                                className="bg-primary h-2 rounded-full"
                              ></motion.div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal footer */}
              <div className="p-4 border-t border-muted/20 flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 border border-muted/40 rounded-lg hover:bg-muted/20 transition-colors"
                  onClick={closeModal}
                >
                  Batal
                </motion.button>

                {modalMode === "add" && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      !formData.title ||
                      (!formData.files.docx.url && !formData.files.pdf.url)
                        ? "bg-secondary text-onPrimary cursor-not-allowed"
                        : "bg-secondary text-onPrimary hover:bg-secondary/50 shadow-sm"
                    }`}
                    onClick={handleCreate}
                    disabled={
                      !formData.title ||
                      (!formData.files.docx.url && !formData.files.pdf.url)
                    }
                  >
                    <FiCheck />
                    <span>Tambah Dokumen</span>
                  </motion.button>
                )}

                {modalMode === "edit" && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-secondary text-onPrimary rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 shadow-sm"
                    onClick={handleUpdate}
                  >
                    <FiCheck />
                    <span>Simpan Perubahan</span>
                  </motion.button>
                )}

                {modalMode === "delete" && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
                    onClick={handleDelete}
                  >
                    <FaTrash />
                    <span>Hapus Dokumen</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentManagement;

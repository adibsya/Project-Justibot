<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiDownload, FiEye, FiFile } from "react-icons/fi";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { Document as PDFDocument, Page, pdfjs } from "react-pdf";

// Only set the worker source once
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Document = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [previewDocument, setPreviewDocument] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfError, setPdfError] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);

  // Handle PDF document loading success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPdfLoading(false);
    setPdfError(null);
  };

  // Handle PDF loading error
  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setPdfError("Gagal memuat dokumen. Silakan coba lagi.");
    setPdfLoading(false);
  };

  // Navigate to previous page
  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  };

  // Navigate to next page
  const goToNextPage = () => {
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
  };

  const [categories, setCategories] = useState([
    { id: "all", name: "Semua Dokumen" },
    { id: "perjanjian", name: "Perjanjian" },
    { id: "surat resmi", name: "Surat Resmi" },
    { id: "bisnis", name: "Dokumen Bisnis" },
    { id: "perorangan", name: "Dokumen Perorangan" },
  ]);

  // Fetch documents and categories on component mount
  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  // Reset jumlah halaman saat dokumen preview berubah
  useEffect(() => {
    setNumPages(null);
  }, [previewDocument]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/documents/public");
      const result = await response.json();

      if (result.success) {
        setDocuments(result.data);
      } else {
        setError(result.message || "Failed to load documents");
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to load documents. Please try again later.");
      setLoading(false);
    }
  };

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

  // Handle document preview
  const handlePreview = async (doc) => {
    try {
      // Fetch the latest document data with updated view count
      const response = await fetch(`/api/documents/public/${doc.id}`);
      const result = await response.json();

      if (result.success) {
        setPreviewDocument(result.data);
      } else {
        console.error("Error fetching document details:", result.message);
      }
    } catch (error) {
      console.error("Failed to fetch document details:", error);
      setPreviewDocument(doc); // Fallback to current data
    }
  };

  // Handle document download
  const handleDownload = async (doc, format) => {
    try {
      setDownloading(`${doc.id}-${format}`);
      const response = await fetch(
        `/api/documents/download/${doc.id}/${format}`,
      );

      if (response.ok) {
        // Gunakan nama file yang tersimpan di dokumen jika tersedia
        let filename = doc.originalFilename || `${doc.title}.${format}`;

        // Tetap coba ambil dari header jika ada
        const contentDisposition = response.headers.get("content-disposition");
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/);
          if (filenameMatch) filename = filenameMatch[1];
        }

        // Create blob from response
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create temporary link and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error("Error downloading document:", errorData.message);
        alert("Failed to download document. Please try again.");
      }
    } catch (error) {
      console.error("Failed to download document:", error);
      alert("Failed to download document. Please try again.");
    } finally {
      setDownloading(null);
    }
  };

  // Close preview modal
  const handleClosePreview = () => {
    setPreviewDocument(null);
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

  // Determine which documents to show (all or limited)
  const displayDocuments = showAll
    ? filteredDocuments
    : filteredDocuments.slice(0, 6);

  return (
    <main className="min-h-screen bg-background py-8 px-4 md:px-8">
      {/* Header section with improved styling */}
      <div className="max-w-7xl mx-auto ">
        <div className="text-center py-10 px-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-secondary mb-2 relative inline-block">
            Dokumen Hukum
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto">
            Temukan berbagai dokumen hukum untuk kebutuhan Anda dengan opsi
            unduh dalam bentuk Docx atau Pdf
          </p>
        </div>

        {/* Improved search and filter section */}
        <div className="bg-surface/60 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-sm border border-muted/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative text-onSurface/60">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="" />
              </div>
              <input
                type="text"
                placeholder="Cari dokumen..."
                className="pl-10 pr-4 py-3 w-full bg-white/80 border border-muted/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-3 whitespace-nowrap mr-2 rounded-lg transition-all ${
                    activeCategory === category.id
                      ? "bg-secondary text-white shadow-md shadow-primary/30"
                      : "bg-white hover:bg-muted/20 text-textSecondary"
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Documents section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg">{error}</div>
        ) : displayDocuments.length === 0 ? (
          <div className="bg-muted/10 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mb-4">
              <FiFile className="w-8 h-8 text-textSecondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-onSurface/70">
              Tidak Ada Dokumen
            </h3>
            <p className="text-onSurface/70 max-w-md mx-auto">
              Tidak ada dokumen yang sesuai dengan pencarian Anda. Silakan coba
              dengan kata kunci lain atau kategori yang berbeda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className={`bg-surface border border-muted/20 rounded-xl overflow-hidden transition-all duration-300 group hover:shadow-lg hover:border-primary/30 cursor-pointer ${
                    animate ? "transform hover:-translate-y-2" : ""
                  }`}
                  onMouseEnter={() => setAnimate(true)}
                  onClick={() => handlePreview(doc)} // Add click handler to the entire card
                >
                  {/* Add thumbnail display */}
                  {doc.files.thumbnail && doc.files.thumbnail.url ? (
                    <div className="w-full h-40 overflow-hidden">
                      <img
                        src={doc.files.thumbnail.url}
                        alt={doc.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-muted/20 flex items-center justify-center">
                      <FiFile className="w-12 h-12 text-textSecondary/30" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-end items-start mb-4">
                      <div className="flex items-center text-textSecondary text-xs bg-muted/10 py-1 px-2 rounded-full">
                        <FiEye className="mr-1" />
                        <span>{doc.views?.toLocaleString()}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-md text-onSurface mb-2 line-clamp-1 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-onSurface/60 text-sm mb-4 line-clamp-2">
                      {doc.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary text-onPrimary font-medium">
                          {categories.find((c) => c.id === doc.category)
                            ?.name || doc.category}
                        </span>
                        <span className="text-xs ml-2 text-textSecondary">
                          {doc.pages} halaman
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-muted/5 border-t border-muted/20 flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click event
                        handlePreview(doc);
                      }}
                      className="text-onSurface/70 hover:text-secondary/50 text-sm font-medium transition-colors flex items-center"
                    >
                      <FiEye className="mr-2" />
                      Pratinjau
                    </button>
                    <div className="flex space-x-2">
                      {doc.files.docx && (
                        <button
                          className={`px-3 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all ${
                            downloading === `${doc.id}-docx`
                              ? "bg-blue-100 text-blue-700 animate-pulse cursor-not-allowed"
                              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            handleDownload(doc, "docx");
                          }}
                          title="Download DOCX"
                          disabled={downloading === `${doc.id}-docx`}
                        >
                          {downloading === `${doc.id}-docx` ? (
                            <>
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                              <span>Mengunduh...</span>
                            </>
                          ) : (
                            <>
                              <FaFileWord size={16} />
                              <span>DOCX</span>
                            </>
                          )}
                        </button>
                      )}
                      {doc.files.pdf && (
                        <button
                          className={`px-3 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all ${
                            downloading === `${doc.id}-pdf`
                              ? "bg-red-100 text-red-700 animate-pulse cursor-not-allowed"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            handleDownload(doc, "pdf");
                          }}
                          title="Download PDF"
                          disabled={downloading === `${doc.id}-pdf`}
                        >
                          {downloading === `${doc.id}-pdf` ? (
                            <>
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              <span>Mengunduh...</span>
                            </>
                          ) : (
                            <>
                              <FaFilePdf size={16} />
                              <span>PDF</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDocuments.length > 6 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group px-8 py-3 border-2 border-primary/40 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-primary flex items-center mx-auto"
                >
                  {showAll ? (
                    <>
                      Tampilkan Lebih Sedikit
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 group-hover:transform group-hover:-translate-y-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Lihat Semua Dokumen
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 group-hover:transform group-hover:translate-y-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Document preview modal */}
      {previewDocument && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div
            onClick={handleClosePreview}
            className="absolute inset-0 cursor-pointer"
          ></div>
          <div
            className="bg-surface rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 md:p-5 border-b border-muted/20 flex justify-between items-center bg-gradient-to-r from-surface to-muted/10">
              <h2 className="text-xl font-semibold text-onSurface">
                {previewDocument.title}
              </h2>
              <button
                className="p-2 rounded-full hover:bg-muted/20 transition-colors"
                onClick={handleClosePreview}
                aria-label="Close preview"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-130px)] custom-scrollbar text-onSurface">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                <div className="w-full md:w-2/3">
                  <p className="text-onSurface mb-6 text-md">
                    {previewDocument.description}
                  </p>

                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-3 text-onSurface flex items-center">
                      <span className="w-1.5 h-5 bg-secondary rounded-sm mr-2"></span>
                      Deskripsi Dokumen
                    </h3>
                    <div className="bg-muted/5 p-4 rounded-lg border border-muted/20 text-md">
                      <p>
                        Dokumen ini berisi{" "}
                        <span className="font-medium">
                          {previewDocument.pages} halaman
                        </span>{" "}
                        dan telah dilihat sebanyak{" "}
                        <span className="font-medium">
                          {previewDocument.views?.toLocaleString()} kali
                        </span>
                        .
                      </p>
                      <p className="mt-2">
                        Dokumen ini termasuk dalam kategori{" "}
                        <span className="font-medium text-secondary">
                          {categories.find(
                            (c) => c.id === previewDocument.category,
                          )?.name || previewDocument.category}
                        </span>
                        .
                      </p>
                    </div>

                    {/* Document Content Preview Section */}
                    <h3 className="text-lg font-semibold my-5 text-onSurface flex items-center">
                      <span className="w-1.5 h-5 bg-secondary rounded-sm mr-2"></span>
                      Pratinjau Dokumen
                    </h3>

                    {/* Scribd-like document preview card */}
                    <div className="bg-white rounded-lg border border-muted/20 shadow-md overflow-hidden text-secondary">
                      {/* Preview header */}
                      <div className="bg-muted/10 px-4 py-3 border-b border-muted/20 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-onSurface/60">
                            {previewDocument.title} ({previewDocument.pages}{" "}
                            halaman)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-onSurface/60">
                            Halaman Pratinjau
                          </span>
                        </div>
                      </div>

                      {/* Document preview content */}
                      <div className="bg-gray-100 flex flex-col items-center p-4 min-h-[400px]">
                        {previewDocument?.files?.pdf ? (
                          <>
                            <div className="pdf-container relative w-full flex justify-center">
                              {pdfLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              )}
                              {pdfError && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg w-full text-center">
                                  {pdfError}
                                </div>
                              )}

                              <PDFDocument
                                file={`/api/documents/preview/${previewDocument.id}`}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={onDocumentLoadError}
                                loading={
                                  <div className="text-center py-10">
                                    Loading document...
                                  </div>
                                }
                                className="pdf-document"
                              >
                                <Page
                                  pageNumber={pageNumber}
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                  className="pdf-page shadow-lg"
                                  width={550}
                                />
                              </PDFDocument>
                            </div>

                            {numPages > 0 && (
                              <div className="flex items-center justify-between w-full max-w-lg mt-4 bg-white rounded-lg shadow px-4 py-2">
                                <button
                                  onClick={goToPrevPage}
                                  disabled={pageNumber <= 1}
                                  className={`px-3 py-1 rounded ${pageNumber <= 1 ? "text-gray-400 cursor-not-allowed" : "text-primary hover:bg-primary/10"}`}
                                >
                                  ← Sebelumnya
                                </button>

                                <p className="text-sm">
                                  Halaman{" "}
                                  <span className="font-medium">
                                    {pageNumber}
                                  </span>{" "}
                                  dari{" "}
                                  <span className="font-medium">
                                    {numPages}
                                  </span>
                                </p>

                                <button
                                  onClick={goToNextPage}
                                  disabled={pageNumber >= numPages}
                                  className={`px-3 py-1 rounded ${pageNumber >= numPages ? "text-gray-400 cursor-not-allowed" : "text-primary hover:bg-primary/10"}`}
                                >
                                  Selanjutnya →
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[400px] text-center">
                            <FiFile size={48} className="text-gray-400 mb-4" />
                            <p className="text-textSecondary">
                              Pratinjau dokumen tidak tersedia. Silakan unduh
                              dokumen untuk melihatnya.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-3 bg-muted/5 border-t border-muted/20 flex justify-center items-center ">
                        <div className="text-xs text-textSecondary/70 flex items-center">
                          <span className="font-medium text-primary mr-1">
                            JustiBot
                          </span>{" "}
                          ©{new Date().getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3 bg-muted/5 p-5 rounded-lg border border-muted/20">
                  <h4 className="font-semibold mb-4 text-onSurface">
                    Format yang Tersedia:
                  </h4>
                  <div className="space-y-3">
                    {previewDocument.files.docx && (
                      <div
                        className={`
        flex items-center justify-between bg-white p-3 rounded-lg border border-muted/20 
        hover:border-blue-200 transition-all cursor-pointer group
        ${downloading === `${previewDocument.id}-docx` ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-50/30"}
      `}
                        onClick={() => {
                          if (downloading !== `${previewDocument.id}-docx`) {
                            handleDownload(previewDocument, "docx");
                          }
                        }}
                        title="Click to download DOCX"
                      >
                        <div className="flex items-center pointer-events-none">
                          <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-onPrimary transition-colors">
                            <FaFileWord size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">DOCX</p>
                            <p className="text-xs text-textSecondary">
                              {previewDocument.files.docx.size}
                            </p>
                          </div>
                        </div>
                        <div className="pointer-events-none">
                          {downloading === `${previewDocument.id}-docx` ? (
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <FiDownload
                              size={20}
                              className="text-onSurface group-hover:text-onSurface/50 transition-colors"
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {previewDocument.files.pdf && (
                      <div
                        className={`
                          flex items-center justify-between bg-white p-3 rounded-lg border border-muted/20 
                          hover:border-red-200 transition-all cursor-pointer group
                          ${downloading === `${previewDocument.id}-pdf` ? "opacity-60 cursor-not-allowed" : "hover:bg-red-50/30"}
                        `}
                        onClick={() => {
                          if (downloading !== `${previewDocument.id}-pdf`) {
                            handleDownload(previewDocument, "pdf");
                          }
                        }}
                        title="Click to download PDF"
                      >
                        <div className="flex items-center pointer-events-none">
                          <div className="bg-red-100 p-2 rounded-lg mr-3 group-hover:bg-onPrimary transition-colors">
                            <FaFilePdf size={20} className="text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">PDF</p>
                            <p className="text-xs text-textSecondary">
                              {previewDocument.files.pdf.size}
                            </p>
                          </div>
                        </div>
                        <div className="pointer-events-none">
                          {downloading === `${previewDocument.id}-pdf` ? (
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <FiDownload
                              size={20}
                              className="text-onSurface group-hover:text-onSurface/50 transition-colors"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-4 text-onSurface">
                      Informasi Dokumen
                    </h4>
                    <div className="bg-white rounded-lg border border-muted/20 shadow-sm overflow-hidden">
                      <table className="w-full">
                        <tbody className="divide-y divide-muted/10">
                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="px-1 py-3 text-sm text-textSecondary font-medium w-1/2">
                              Tanggal Upload
                            </td>
                            <td className="px-1 py-3 text-sm text-textPrimary font-semibold text-right">
                              {new Date(
                                previewDocument.dateAdded,
                              ).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                          </tr>

                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="px-1 py-3 text-sm text-textSecondary font-medium">
                              Terakhir Diperbarui
                            </td>
                            <td className="px-1 py-3 text-sm text-textPrimary font-semibold text-right">
                              {new Date(
                                previewDocument.updatedAt,
                              ).toLocaleDateString("id-ID", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                          </tr>

                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="px-1 py-3 text-sm text-textSecondary font-medium">
                              Jumlah Halaman
                            </td>
                            <td className="px-1 py-3 text-sm text-textPrimary font-semibold text-right">
                              {previewDocument.pages} halaman
                            </td>
                          </tr>

                          <tr className="hover:bg-muted/5 transition-colors">
                            <td className="px-1 py-3 text-sm text-textSecondary font-medium">
                              Total Dilihat
                            </td>
                            <td className="px-1 py-3 text-sm text-textPrimary font-semibold text-right">
                              {previewDocument.views?.toLocaleString() || 0}{" "}
                              kali
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 mb-6 border-t border-muted/20 flex justify-end bg-muted/5">
              <button
                className="px-5 py-2 border text-onPrimary bg-secondary rounded-lg hover:bg-secondary/80 transition-colors mr-3"
                onClick={handleClosePreview}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
=======
import React from 'react';
import DaftarDokumen from '../../components/User/Document/DaftarDokumen';

const Document = () => {
  return (
    <div>
      <DaftarDokumen />
    </div>
  )
}
>>>>>>> bed091f0084c772eaca26c117192ef3d6a2b2b5c

export default Document

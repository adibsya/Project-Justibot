const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db"); // Tambahkan koneksi database di sini jika belum ada

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/documents");

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    cb(null, fileName);
  },
});

// File filter to restrict file types for documents and images
const fileFilter = (req, file, cb) => {
  const allowedDocTypes = [".pdf", ".doc", ".docx"];
  const allowedImageTypes = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();

  // Check if this is a document file or a thumbnail image file
  if (file.fieldname === "thumbnailFile") {
    if (allowedImageTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid image type. Only JPG, JPEG, PNG, GIF, and WEBP are allowed."
        ),
        false
      );
    }
  } else {
    if (allowedDocTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF and Word documents are allowed."
        ),
        false
      );
    }
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Middleware to handle multiple file uploads including thumbnail
const documentUpload = upload.fields([
  { name: "docxFile", maxCount: 1 },
  { name: "pdfFile", maxCount: 1 },
  { name: "thumbnailFile", maxCount: 1 },
]);

// ----- PUBLIC API ROUTES (FOR USER-FACING DOCUMENT.JSX) -----

/**
 * @route   GET /api/documents/public
 * @desc    Get all public documents for regular users
 * @access  Public
 */
router.get("/public", async (req, res) => {
  try {
    // Gunakan database pooling jika tersedia
    if (typeof pool !== "undefined") {
      const result = await pool.query(`
        SELECT 
          id, title, description, link, category, pages, views, 
          date_added AS "dateAdded", updated_at AS "updatedAt", 
          docx_url, docx_size, pdf_url, pdf_size, thumbnail_url, thumbnail_size
        FROM documents 
        ORDER BY updated_at DESC
      `);

      // Format data untuk frontend
      const publicDocuments = result.rows.map((doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        link: doc.link,
        files: {
          docx: doc.docx_url
            ? { url: doc.docx_url, size: doc.docx_size }
            : null,
          pdf: doc.pdf_url ? { url: doc.pdf_url, size: doc.pdf_size } : null,
          thumbnail: doc.thumbnail_url
            ? { url: doc.thumbnail_url, size: doc.thumbnail_size }
            : null,
        },
        category: doc.category,
        pages: doc.pages,
        views: doc.views,
        dateAdded: doc.dateAdded,
        updatedAt: doc.updatedAt,
      }));

      res.json({
        success: true,
        count: publicDocuments.length,
        data: publicDocuments,
      });
    } else {
      // Gunakan data sementara jika belum terhubung ke database
      res.json({
        success: true,
        count: documents.length,
        data: documents.map((doc) => ({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          link: doc.link,
          files: {
            docx: doc.files.docx
              ? { url: doc.files.docx.url, size: doc.files.docx.size }
              : null,
            pdf: doc.files.pdf
              ? { url: doc.files.pdf.url, size: doc.files.pdf.size }
              : null,
            thumbnail: doc.files.thumbnail
              ? { url: doc.files.thumbnail.url, size: doc.files.thumbnail.size }
              : null,
          },
          category: doc.category,
          pages: doc.pages,
          views: doc.views,
          dateAdded: doc.dateAdded,
          updatedAt: doc.updatedAt,
        })),
      });
    }
  } catch (error) {
    console.error("Error fetching public documents:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   GET /api/documents/public/categories
 * @desc    Get document categories for filtering
 * @access  Public
 */
router.get("/public/categories", async (req, res) => {
  try {
    if (typeof pool !== "undefined") {
      // Fetch categories from database
      const result = await pool.query(`
        SELECT DISTINCT category AS id, category AS name 
        FROM documents
        WHERE category IS NOT NULL
      `);

      // Add "All Documents" option
      const categories = [{ id: "all", name: "Semua Dokumen" }, ...result.rows];

      res.json({
        success: true,
        data: categories,
      });
    } else {
      // Use static categories if not connected to database yet
      const categories = [
        { id: "all", name: "Semua Dokumen" },
        { id: "perjanjian", name: "Perjanjian" },
        { id: "surat resmi", name: "Surat Resmi" },
        { id: "bisnis", name: "Dokumen Bisnis" },
        { id: "perorangan", name: "Dokumen Perorangan" },
      ];

      res.json({
        success: true,
        data: categories,
      });
    }
  } catch (error) {
    console.error("Error fetching public categories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   GET /api/documents/public/:id
 * @desc    Get a specific document for preview
 * @access  Public
 */
router.get("/public/:id", async (req, res) => {
  try {
    const documentId = parseInt(req.params.id);

    if (typeof pool !== "undefined") {
      // First update view count
      await pool.query(`UPDATE documents SET views = views + 1 WHERE id = $1`, [
        documentId,
      ]);

      // Then get the updated document
      const result = await pool.query(
        `SELECT 
          id, title, description, link, category, pages, views, 
          date_added AS "dateAdded", updated_at AS "updatedAt", 
          docx_url, docx_size, pdf_url, pdf_size, thumbnail_url, thumbnail_size
        FROM documents 
        WHERE id = $1`,
        [documentId]
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Document not found" });
      }

      const doc = result.rows[0];

      // Format data for frontend
      const publicDocument = {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        link: doc.link,
        files: {
          docx: doc.docx_url
            ? { url: doc.docx_url, size: doc.docx_size }
            : null,
          pdf: doc.pdf_url ? { url: doc.pdf_url, size: doc.pdf_size } : null,
          thumbnail: doc.thumbnail_url
            ? { url: doc.thumbnail_url, size: doc.thumbnail_size }
            : null,
        },
        category: doc.category,
        pages: doc.pages,
        views: doc.views,
        dateAdded: doc.dateAdded,
        updatedAt: doc.updatedAt,
      };

      res.json({
        success: true,
        data: publicDocument,
      });
    } else {
      // In-memory implementation
      const document = documents.find((doc) => doc.id === documentId);

      if (!document) {
        return res
          .status(404)
          .json({ success: false, message: "Document not found" });
      }

      // Increment view count when document is viewed
      document.views = (document.views || 0) + 1;

      // Filter out sensitive information
      const publicDocument = {
        id: document.id,
        title: document.title,
        description: document.description,
        link: document.link,
        files: {
          docx: document.files.docx
            ? { url: document.files.docx.url, size: document.files.docx.size }
            : null,
          pdf: document.files.pdf
            ? { url: document.files.pdf.url, size: document.files.pdf.size }
            : null,
          thumbnail: document.files.thumbnail
            ? {
                url: document.files.thumbnail.url,
                size: document.files.thumbnail.size,
              }
            : null,
        },
        category: document.category,
        pages: document.pages,
        views: document.views,
        dateAdded: document.dateAdded,
        updatedAt: document.updatedAt,
      };

      res.json({
        success: true,
        data: publicDocument,
      });
    }
  } catch (error) {
    console.error(`Error fetching public document ${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * @route   GET /api/documents/download/:id/:format
 * @desc    Download a document file
 * @access  Public
 */
router.get("/download/:id/:format", async (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const format = req.params.format.toLowerCase();

    if (format !== "pdf" && format !== "docx") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid format requested" });
    }

    if (typeof pool !== "undefined") {
      // Ubah query untuk juga mengambil original filename
      const result = await pool.query(
        `SELECT 
          docx_path, pdf_path, 
          title,
          docx_original_filename, pdf_original_filename
        FROM documents 
        WHERE id = $1`,
        [documentId]
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Document not found" });
      }

      const document = result.rows[0];
      const filePath =
        format === "docx" ? document.docx_path : document.pdf_path;

      // Gunakan nama file original jika tersedia, atau fallback ke title
      const originalFilename =
        format === "docx"
          ? document.docx_original_filename
          : document.pdf_original_filename;

      const downloadFilename =
        originalFilename || `${document.title}.${format}`;

      // Check if requested format exists
      if (!filePath) {
        return res.status(404).json({
          success: false,
          message: `Document not available in ${format.toUpperCase()} format`,
        });
      }

      // Set header untuk nama file yang diunduh
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${downloadFilename}"`
      );

      // Send the actual file
      res.download(filePath, downloadFilename);
    } else {
      // In-memory implementation
      const document = documents.find((doc) => doc.id === documentId);

      if (!document) {
        return res
          .status(404)
          .json({ success: false, message: "Document not found" });
      }

      // Check if requested format exists
      if (!document.files[format]) {
        return res.status(404).json({
          success: false,
          message: `Document not available in ${format.toUpperCase()} format`,
        });
      }

      // Ambil nama file original jika tersedia
      const originalFilename = document.files[format].originalFilename;
      const downloadFilename =
        originalFilename || `${document.title}.${format}`;

      // Set header untuk nama file yang diunduh (tambahkan baris ini)
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${downloadFilename}"`
      );

      // Send the actual file
      const filePath = document.files[format].path;
      res.download(filePath, downloadFilename);
    }
  } catch (error) {
    console.error(`Error downloading document ${req.params.id}:`, error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----- ADMIN API ROUTES (FOR ADMIN DOCUMENT MANAGEMENT) -----

/**
 * @route   GET /api/documents
 * @desc    Get all documents (admin view)
 * @access  Private (Admin)
 */
router.get(
  "/",
  /* authenticateUser, authorizeAdmin, */
  async (req, res) => {
    try {
      if (typeof pool !== "undefined") {
        const result = await pool.query(`
          SELECT 
            id, title, description, link, category, pages, views, 
            date_added AS "dateAdded", updated_at AS "updatedAt", 
            docx_url, docx_size, docx_path, pdf_url, pdf_size, pdf_path,
            thumbnail_url, thumbnail_size, thumbnail_path
          FROM documents 
          ORDER BY updated_at DESC
        `);

        // Format data untuk frontend admin
        const adminDocuments = result.rows.map((doc) => ({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          link: doc.link,
          files: {
            docx: doc.docx_url
              ? {
                  url: doc.docx_url,
                  size: doc.docx_size,
                  path: doc.docx_path,
                }
              : null,
            pdf: doc.pdf_url
              ? {
                  url: doc.pdf_url,
                  size: doc.pdf_size,
                  path: doc.pdf_path,
                }
              : null,
            thumbnail: doc.thumbnail_url
              ? {
                  url: doc.thumbnail_url,
                  size: doc.thumbnail_size,
                  path: doc.thumbnail_path,
                }
              : null,
          },
          category: doc.category,
          pages: doc.pages,
          views: doc.views,
          dateAdded: doc.dateAdded,
          updatedAt: doc.updatedAt,
        }));

        res.json({
          success: true,
          count: adminDocuments.length,
          data: adminDocuments,
        });
      } else {
        // In-memory implementation
        res.json({
          success: true,
          count: documents.length,
          data: documents,
        });
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

/**
 * @route   POST /api/documents
 * @desc    Create a new document
 * @access  Private (Admin)
 */
router.post(
  "/",
  /* authenticateUser, authorizeAdmin, */
  documentUpload,
  async (req, res) => {
    try {
      const { title, description, category, pages } = req.body;

      // Validate required fields
      if (!title || !category) {
        return res.status(400).json({
          success: false,
          message: "Please provide title and category",
        });
      }

      // Create file objects
      const files = {
        docx: null,
        pdf: null,
        thumbnail: null,
      };

      // Process uploaded docx file if exists
      if (req.files.docxFile) {
        files.docx = saveDocument(req.files.docxFile[0], "docx");
      }

      // Process uploaded pdf file if exists
      if (req.files.pdfFile) {
        files.pdf = saveDocument(req.files.pdfFile[0], "pdf");
      }

      // Process uploaded thumbnail if exists
      if (req.files.thumbnailFile) {
        files.thumbnail = saveDocument(req.files.thumbnailFile[0], "thumbnail");
      }

      // If no document files were uploaded, return error
      if (!files.docx && !files.pdf) {
        return res.status(400).json({
          success: false,
          message: "At least one document file is required",
        });
      }

      // Create link from title
      const link = `/document/${title.toLowerCase().replace(/\s+/g, "-")}`;

      // Current date for created and updated fields
      const currentDate = new Date().toISOString().split("T")[0];

      if (typeof pool !== "undefined") {
        // Insert into database
        const result = await pool.query(
          `INSERT INTO documents (
            title, description, link, category, pages, views,
            date_added, updated_at, 
            docx_url, docx_size, docx_path,
            pdf_url, pdf_size, pdf_path,
            thumbnail_url, thumbnail_size, thumbnail_path
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          RETURNING id`,
          [
            title,
            description || "",
            link,
            category,
            parseInt(pages) || 0,
            0, // initial views
            currentDate,
            currentDate,
            files.docx ? files.docx.url : null,
            files.docx ? files.docx.size : null,
            files.docx ? files.docx.path : null,
            files.pdf ? files.pdf.url : null,
            files.pdf ? files.pdf.size : null,
            files.pdf ? files.pdf.path : null,
            files.thumbnail ? files.thumbnail.url : null,
            files.thumbnail ? files.thumbnail.size : null,
            files.thumbnail ? files.thumbnail.path : null,
          ]
        );

        // Get new document's ID
        const newDocumentId = result.rows[0].id;

        // Retrieve the complete document to return
        const newDocument = await pool.query(
          `SELECT 
            id, title, description, link, category, pages, views, 
            date_added AS "dateAdded", updated_at AS "updatedAt", 
            docx_url, docx_size, pdf_url, pdf_size, thumbnail_url, thumbnail_size
          FROM documents 
          WHERE id = $1`,
          [newDocumentId]
        );

        // Format response
        const doc = newDocument.rows[0];
        const responseDoc = {
          id: doc.id,
          title: doc.title,
          description: doc.description,
          link: doc.link,
          files: {
            docx: doc.docx_url
              ? { url: doc.docx_url, size: doc.docx_size }
              : null,
            pdf: doc.pdf_url ? { url: doc.pdf_url, size: doc.pdf_size } : null,
            thumbnail: doc.thumbnail_url
              ? { url: doc.thumbnail_url, size: doc.thumbnail_size }
              : null,
          },
          category: doc.category,
          pages: doc.pages,
          views: doc.views,
          dateAdded: doc.dateAdded,
          updatedAt: doc.updatedAt,
        };

        res.status(201).json({
          success: true,
          data: responseDoc,
          message: "Document created successfully",
        });
      } else {
        // In-memory implementation
        const newDocument = {
          id:
            documents.length > 0
              ? Math.max(...documents.map((doc) => doc.id)) + 1
              : 1,
          title,
          description: description || "",
          link,
          files,
          category,
          pages: parseInt(pages) || 0,
          views: 0,
          dateAdded: currentDate,
          updatedAt: currentDate,
        };

        // Add to documents array
        documents.push(newDocument);

        res.status(201).json({
          success: true,
          data: newDocument,
          message: "Document created successfully",
        });
      }
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

/**
 * @route   PUT /api/documents/:id
 * @desc    Update a document
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  /* authenticateUser, authorizeAdmin, */
  documentUpload,
  async (req, res) => {
    try {
      const documentId = parseInt(req.params.id);
      const { title, description, category, pages } = req.body;

      if (typeof pool !== "undefined") {
        // Verify document exists
        const documentCheck = await pool.query(
          "SELECT * FROM documents WHERE id = $1",
          [documentId]
        );

        if (documentCheck.rows.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Document not found" });
        }

        const existingDocument = documentCheck.rows[0];

        // Prepare update fields and values
        let updateFields = [];
        let values = [];
        let valueIndex = 1;

        // Handle basic fields
        if (title) {
          updateFields.push(`title = $${valueIndex}`);
          values.push(title);
          valueIndex++;

          // Update link if title changed
          if (title !== existingDocument.title) {
            updateFields.push(`link = $${valueIndex}`);
            values.push(
              `/document/${title.toLowerCase().replace(/\s+/g, "-")}`
            );
            valueIndex++;
          }
        }

        if (description !== undefined) {
          updateFields.push(`description = $${valueIndex}`);
          values.push(description);
          valueIndex++;
        }

        if (category) {
          updateFields.push(`category = $${valueIndex}`);
          values.push(category);
          valueIndex++;
        }

        if (pages) {
          updateFields.push(`pages = $${valueIndex}`);
          values.push(parseInt(pages));
          valueIndex++;
        }

        // Always update the updated_at timestamp
        updateFields.push(`updated_at = $${valueIndex}`);
        values.push(new Date().toISOString().split("T")[0]);
        valueIndex++;

        // Handle file updates if new files were uploaded
        if (req.files) {
          // Update docx file if new one was uploaded
          if (req.files.docxFile) {
            const docxFile = req.files.docxFile[0];

            // Delete old file if exists
            if (existingDocument.docx_path) {
              try {
                fs.unlinkSync(existingDocument.docx_path);
              } catch (err) {
                console.warn(`Could not delete old docx file: ${err.message}`);
              }
            }

            updateFields.push(`docx_url = $${valueIndex}`);
            values.push(`/documents/${docxFile.filename}`);
            valueIndex++;

            updateFields.push(`docx_size = $${valueIndex}`);
            values.push(`${Math.round(docxFile.size / 1024)} KB`);
            valueIndex++;

            updateFields.push(`docx_path = $${valueIndex}`);
            values.push(docxFile.path);
            valueIndex++;
          }

          // Update pdf file if new one was uploaded
          if (req.files.pdfFile) {
            const pdfFile = req.files.pdfFile[0];

            // Delete old file if exists
            if (existingDocument.pdf_path) {
              try {
                fs.unlinkSync(existingDocument.pdf_path);
              } catch (err) {
                console.warn(`Could not delete old pdf file: ${err.message}`);
              }
            }

            updateFields.push(`pdf_url = $${valueIndex}`);
            values.push(`/documents/${pdfFile.filename}`);
            valueIndex++;

            updateFields.push(`pdf_size = $${valueIndex}`);
            values.push(`${Math.round(pdfFile.size / 1024)} KB`);
            valueIndex++;

            updateFields.push(`pdf_path = $${valueIndex}`);
            values.push(pdfFile.path);
            valueIndex++;
          }

          // Update thumbnail file if new one was uploaded
          if (req.files.thumbnailFile) {
            const thumbnailFile = req.files.thumbnailFile[0];

            // Delete old thumbnail if exists
            if (existingDocument.thumbnail_path) {
              try {
                fs.unlinkSync(existingDocument.thumbnail_path);
              } catch (err) {
                console.warn(
                  `Could not delete old thumbnail file: ${err.message}`
                );
              }
            }

            updateFields.push(`thumbnail_url = $${valueIndex}`);
            values.push(`/api/uploads/documents/${thumbnailFile.filename}`); // Updated path
            valueIndex++;

            updateFields.push(`thumbnail_size = $${valueIndex}`);
            values.push(`${Math.round(thumbnailFile.size / 1024)} KB`);
            valueIndex++;

            updateFields.push(`thumbnail_path = $${valueIndex}`);
            values.push(thumbnailFile.path);
            valueIndex++;
          }
        }

        // If no fields to update, return early
        if (updateFields.length === 0) {
          return res
            .status(400)
            .json({ success: false, message: "No fields to update" });
        }

        // Build the SQL query
        const query = `
          UPDATE documents 
          SET ${updateFields.join(", ")} 
          WHERE id = $${valueIndex} 
          RETURNING *`;

        // Add document ID as the last parameter
        values.push(documentId);

        // Execute update
        await pool.query(query, values);

        // Fetch updated document for response
        const updatedResult = await pool.query(
          `SELECT 
            id, title, description, link, category, pages, views, 
            date_added AS "dateAdded", updated_at AS "updatedAt", 
            docx_url, docx_size, pdf_url, pdf_size, thumbnail_url, thumbnail_size
          FROM documents 
          WHERE id = $1`,
          [documentId]
        );

        const doc = updatedResult.rows[0];
        const responseDoc = {
          id: doc.id,
          title: doc.title,
          description: doc.description,
          link: doc.link,
          files: {
            docx: doc.docx_url
              ? { url: doc.docx_url, size: doc.docx_size }
              : null,
            pdf: doc.pdf_url ? { url: doc.pdf_url, size: doc.pdf_size } : null,
            thumbnail: doc.thumbnail_url
              ? { url: doc.thumbnail_url, size: doc.thumbnail_size }
              : null,
          },
          category: doc.category,
          pages: doc.pages,
          views: doc.views,
          dateAdded: doc.dateAdded,
          updatedAt: doc.updatedAt,
        };

        res.json({
          success: true,
          data: responseDoc,
          message: "Document updated successfully",
        });
      } else {
        // In-memory implementation
        const documentIndex = documents.findIndex(
          (doc) => doc.id === documentId
        );

        if (documentIndex === -1) {
          return res
            .status(404)
            .json({ success: false, message: "Document not found" });
        }

        const existingDocument = documents[documentIndex];

        // Create updated document object
        const updatedDocument = {
          ...existingDocument,
          title: title || existingDocument.title,
          description:
            description !== undefined
              ? description
              : existingDocument.description,
          category: category || existingDocument.category,
          pages: pages ? parseInt(pages) : existingDocument.pages,
          updatedAt: new Date().toISOString().split("T")[0],
        };

        // Update link if title changed
        if (title && title !== existingDocument.title) {
          updatedDocument.link = `/document/${title
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
        }

        // Handle file updates if new files were uploaded
        if (req.files) {
          updatedDocument.files = { ...existingDocument.files };

          // Update docx file if new one was uploaded
          if (req.files.docxFile) {
            const docxFile = req.files.docxFile[0];

            // Delete old file if exists
            if (
              existingDocument.files.docx &&
              existingDocument.files.docx.path
            ) {
              try {
                fs.unlinkSync(existingDocument.files.docx.path);
              } catch (err) {
                console.warn(`Could not delete old docx file: ${err.message}`);
              }
            }

            updatedDocument.files.docx = {
              url: `/documents/${docxFile.filename}`,
              size: `${Math.round(docxFile.size / 1024)} KB`,
              path: docxFile.path,
            };
          }

          // Update pdf file if new one was uploaded
          if (req.files.pdfFile) {
            const pdfFile = req.files.pdfFile[0];

            // Delete old file if exists
            if (existingDocument.files.pdf && existingDocument.files.pdf.path) {
              try {
                fs.unlinkSync(existingDocument.files.pdf.path);
              } catch (err) {
                console.warn(`Could not delete old pdf file: ${err.message}`);
              }
            }

            updatedDocument.files.pdf = {
              url: `/documents/${pdfFile.filename}`,
              size: `${Math.round(pdfFile.size / 1024)} KB`,
              path: pdfFile.path,
            };
          }

          // Update thumbnail file if new one was uploaded
          if (req.files.thumbnailFile) {
            const thumbnailFile = req.files.thumbnailFile[0];

            // Delete old thumbnail if exists
            if (
              existingDocument.files.thumbnail &&
              existingDocument.files.thumbnail.path
            ) {
              try {
                fs.unlinkSync(existingDocument.files.thumbnail.path);
              } catch (err) {
                console.warn(
                  `Could not delete old thumbnail file: ${err.message}`
                );
              }
            }

            updatedDocument.files.thumbnail = {
              url: `/documents/${thumbnailFile.filename}`,
              size: `${Math.round(thumbnailFile.size / 1024)} KB`,
              path: thumbnailFile.path,
            };
          }
        }

        // Update the document in the array
        documents[documentIndex] = updatedDocument;

        res.json({
          success: true,
          data: updatedDocument,
          message: "Document updated successfully",
        });
      }
    } catch (error) {
      console.error(`Error updating document ${req.params.id}:`, error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

/**
 * @route   DELETE /api/documents/:id
 * @desc    Delete a document
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  /* authenticateUser, authorizeAdmin, */
  async (req, res) => {
    try {
      const documentId = parseInt(req.params.id);

      if (typeof pool !== "undefined") {
        // First get document details to access file paths
        const documentResult = await pool.query(
          "SELECT docx_path, pdf_path, thumbnail_path FROM documents WHERE id = $1",
          [documentId]
        );

        if (documentResult.rows.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Document not found" });
        }

        const documentToDelete = documentResult.rows[0];

        // Delete document files from storage
        if (documentToDelete.docx_path) {
          try {
            fs.unlinkSync(documentToDelete.docx_path);
          } catch (err) {
            console.warn(`Could not delete docx file: ${err.message}`);
          }
        }

        if (documentToDelete.pdf_path) {
          try {
            fs.unlinkSync(documentToDelete.pdf_path);
          } catch (err) {
            console.warn(`Could not delete pdf file: ${err.message}`);
          }
        }

        if (documentToDelete.thumbnail_path) {
          try {
            fs.unlinkSync(documentToDelete.thumbnail_path);
          } catch (err) {
            console.warn(`Could not delete thumbnail file: ${err.message}`);
          }
        }

        // Delete document from database
        await pool.query("DELETE FROM documents WHERE id = $1", [documentId]);

        res.json({
          success: true,
          message: "Document deleted successfully",
        });
      } else {
        // In-memory implementation
        const documentIndex = documents.findIndex(
          (doc) => doc.id === documentId
        );

        if (documentIndex === -1) {
          return res
            .status(404)
            .json({ success: false, message: "Document not found" });
        }

        const documentToDelete = documents[documentIndex];

        // Delete document files from storage
        if (documentToDelete.files) {
          // Delete docx file if exists
          if (documentToDelete.files.docx && documentToDelete.files.docx.path) {
            try {
              fs.unlinkSync(documentToDelete.files.docx.path);
            } catch (err) {
              console.warn(`Could not delete docx file: ${err.message}`);
            }
          }

          // Delete pdf file if exists
          if (documentToDelete.files.pdf && documentToDelete.files.pdf.path) {
            try {
              fs.unlinkSync(documentToDelete.files.pdf.path);
            } catch (err) {
              console.warn(`Could not delete pdf file: ${err.message}`);
            }
          }

          // Delete thumbnail file if exists
          if (
            documentToDelete.files.thumbnail &&
            documentToDelete.files.thumbnail.path
          ) {
            try {
              fs.unlinkSync(documentToDelete.files.thumbnail.path);
            } catch (err) {
              console.warn(`Could not delete thumbnail file: ${err.message}`);
            }
          }
        }

        // Remove document from array
        documents.splice(documentIndex, 1);

        res.json({
          success: true,
          message: "Document deleted successfully",
        });
      }
    } catch (error) {
      console.error(`Error deleting document ${req.params.id}:`, error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

/**
 * @route   GET /api/documents/stats
 * @desc    Get document statistics for admin dashboard
 * @access  Private (Admin)
 */
router.get(
  "/stats",
  /* authenticateUser, authorizeAdmin, */
  async (req, res) => {
    try {
      if (typeof pool !== "undefined") {
        // Get total documents count
        const countResult = await pool.query("SELECT COUNT(*) FROM documents");
        const totalDocuments = parseInt(countResult.rows[0].count);

        // Get category counts
        const categoryResult = await pool.query(
          "SELECT category, COUNT(*) FROM documents GROUP BY category"
        );

        const categoryCounts = {};
        categoryResult.rows.forEach((row) => {
          categoryCounts[row.category] = parseInt(row.count);
        });

        // Get total views
        const viewsResult = await pool.query(
          "SELECT SUM(views) FROM documents"
        );
        const totalViews = parseInt(viewsResult.rows[0].sum || 0);

        // Get most viewed documents
        const mostViewedResult = await pool.query(
          `SELECT id, title, views 
           FROM documents 
           ORDER BY views DESC 
           LIMIT 5`
        );

        const mostViewed = mostViewedResult.rows;

        res.json({
          success: true,
          data: {
            totalDocuments,
            categoryCounts,
            totalViews,
            mostViewed,
          },
        });
      } else {
        // In-memory implementation
        // Calculate total documents by category
        const categoryCounts = documents.reduce((acc, doc) => {
          acc[doc.category] = (acc[doc.category] || 0) + 1;
          return acc;
        }, {});

        // Calculate total views
        const totalViews = documents.reduce(
          (sum, doc) => sum + (doc.views || 0),
          0
        );

        // Get most viewed documents
        const mostViewed = [...documents]
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 5);

        res.json({
          success: true,
          data: {
            totalDocuments: documents.length,
            categoryCounts,
            totalViews,
            mostViewed,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching document stats:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// Add this route to your documentManagementRoutes.js file

// Preview document (PDF only) - Public access
router.get("/preview/:id", async (req, res) => {
  try {
    const documentId = req.params.id;
    // Get document from database
    const document = await db.query(
      "SELECT * FROM documents WHERE id = $1 AND is_public = true",
      [documentId]
    );

    if (!document.rows[0] || !document.rows[0].file_path) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    // Get the file path
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      "documents",
      document.rows[0].file_path
    );

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    // Set headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${document.rows[0].title}.pdf"`
    );

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error serving preview document:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to preview document" });
  }
});

// Error handler for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File is too large. Maximum size is 10MB",
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err) {
    return res.status(400).json({ success: false, message: err.message });
  }

  next();
});

// In-memory document collection for fallback use
let documents = [];
/**
 * Helper function untuk menyimpan file dokumen dan metadata-nya
 * @param {Object} file - File yang diupload (dari multer)
 * @param {String} fileType - Tipe file (docx, pdf, atau thumbnail)
 * @param {String} originalFilename - Nama file asli yang diupload
 * @returns {Object} - Informasi file yang disimpan
 */
const saveDocument = (file, fileType) => {
  // Dapatkan nama file asli untuk disimpan
  const originalFilename = file.originalname;

  // File sudah disimpan oleh multer dengan nama unik dari configurasi storage
  // Kita hanya perlu menyiapkan data untuk disimpan di database

  const fileUrl =
    fileType === "thumbnail"
      ? `/api/uploads/documents/${file.filename}`
      : `/documents/${file.filename}`;

  return {
    url: fileUrl,
    size: `${Math.round(file.size / 1024)} KB`,
    path: file.path,
    originalFilename: originalFilename,
  };
};

module.exports = router;

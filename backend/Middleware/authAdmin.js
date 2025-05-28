const jwt = require("jsonwebtoken");

// Middleware otentikasi
function authenticate(req, res, next) {
  const token = req.cookies.token; // Ambil token dari cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token tidak ditemukan." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = decoded; // Simpan payload token ke req.user
    next();
  });
}

// Middleware khusus authorize admin
function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak. Hanya admin yang boleh mengakses." });
  }
  next();
}

module.exports = {
  authenticate,
  authorizeAdmin,
};
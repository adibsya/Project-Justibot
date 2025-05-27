const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.cookies.token; // Ambil token dari cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token tidak ditemukan." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    // Pastikan hanya ambil data yang diperlukan dari JWT payload
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role, // Misalnya jika ada role
    };

    next(); // Lanjut ke middleware/route berikutnya
  });
}



module.exports = authenticate;

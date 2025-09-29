const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file HTML
app.use(express.static(path.join(__dirname, "public")));

// Endpoint menerima data
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 Data masuk:");
  console.log("Nama:", name);
  console.log("Email:", email);
  console.log("Pesan:", message);

  // Balikin ke frontend biar bisa dicek
  res.json({ success: true, name, email, message });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file frontend
app.use(express.static(path.join(__dirname, "public")));

// Endpoint untuk proses form
app.post("/api/check", (req, res) => {
  const { name, age, gender, symptom = [], temp, notes } = req.body;

  // logika diagnosis sederhana
  let risk = "rendah";
  let recommendation = "Kondisi tampaknya normal. Tetap jaga pola hidup sehat.";

  if (temp >= 38 || symptom.includes("fever")) {
    risk = "sedang";
    recommendation = "Anda mengalami demam. Perbanyak minum air, istirahat, dan pantau suhu tubuh.";
  }
  if (temp >= 39 || symptom.includes("breath")) {
    risk = "tinggi";
    recommendation = "Segera periksakan diri ke tenaga medis. Gejala serius terdeteksi.";
  }

  res.json({
    success: true,
    name,
    age,
    gender,
    temp,
    symptoms: symptom,
    notes,
    risk,
    recommendation,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});

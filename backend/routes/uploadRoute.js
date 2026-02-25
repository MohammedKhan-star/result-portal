const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const Student = require("../models/Student");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  await Student.deleteMany();

  for (let row of data) {

    // 👉 Pick Hindi OR Urdu (only one)
    const secondLang = row.Hindi || row.Urdu || 0;

    const total =
      (row.Telugu || 0) +
      secondLang +
      (row.English || 0) +
      (row.Maths || 0) +
      (row.Science || 0) +
      (row.Social || 0);

    const percentage = (total / 480) * 100;

    // ✅ PASS RULES
    const pass =
      (row.Telugu >= 20) &&
      (secondLang >= 28) && // ⭐ Second language pass = 20
      (row.English >= 28) &&
      (row.Maths >= 28) &&
      (row.Science >= 28) &&
      (row.Social >= 28);

    const result = pass ? "PASS" : "FAIL";

    await Student.create({
      hallticket: String(row.HallTicket).padStart(11, "0"),
      name: row.Name,
      hindi: row.Hindi,
      telugu: row.Telugu,
      english: row.English,
      maths: row.Maths,
      science: row.Science,
      social: row.Social,
      total,
      percentage,
      result
    });
  }

  res.json({ message: "Upload Success" });
});

module.exports = router;
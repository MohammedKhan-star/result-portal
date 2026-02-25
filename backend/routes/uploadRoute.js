const express = require("express");
const router = express.Router();
const multer = require("multer");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const Student = require("../models/Student");

const UPLOAD_FOLDER = path.join(__dirname, "../uploads"); // Make sure this folder exists
if (!fs.existsSync(UPLOAD_FOLDER)) fs.mkdirSync(UPLOAD_FOLDER);

const upload = multer({ dest: UPLOAD_FOLDER });

// -------- Upload Excel File --------
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    await Student.deleteMany(); // Clear old data

    for (let row of data) {
      const secondLang = row.Hindi || row.Urdu || 0;
      const total =
        (row.Telugu || 0) +
        secondLang +
        (row.English || 0) +
        (row.Maths || 0) +
        (row.Science || 0) +
        (row.Social || 0);
      const percentage = (total / 480) * 100;

      const pass =
        (row.Telugu >= 20) &&
        (secondLang >= 28) &&
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload Failed", error: err.message });
  }
});

// -------- List Uploaded Files --------
router.get("/files/list", (req, res) => {
  fs.readdir(UPLOAD_FOLDER, (err, files) => {
    if (err) return res.status(500).json({ msg: "Cannot read files" });
    console.log("Files in uploads folder:", files); // <-- Add this
    res.json(files);
  });
});

// -------- Delete File --------
router.delete("/files/:filename", (req, res) => {
  const filePath = path.join(UPLOAD_FOLDER, req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ msg: "Delete Failed" });
    res.json({ msg: "File Deleted" });
  });
});

module.exports = router;
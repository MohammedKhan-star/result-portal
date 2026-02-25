const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/:hallticket", async (req, res) => {
  try {
    // Search for student by hallticket
    const student = await Student.findOne({
      hallticket: req.params.hallticket
    });

    // If no student found, return 404
    if (!student) return res.status(404).json({ msg: "Not Found" });

    // Return student data
    res.json(student);
  } catch (err) {
    // Log the error for debugging (Render logs)
    console.error("Error fetching student:", err);

    // Return 500 with error message
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

module.exports = router;
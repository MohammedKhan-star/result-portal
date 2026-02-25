const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/:hallticket", async (req, res) => {
  const student = await Student.findOne({
    hallticket: req.params.hallticket
  });

  if (!student) return res.status(404).json({ msg: "Not Found" });

  res.json(student);
});

module.exports = router;
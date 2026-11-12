const express = require("express");
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  getAllRegistrations,
} = require("../controllers/registrationController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/:eventId", protect, registerForEvent);
router.get("/my", protect, getMyRegistrations);
router.get("/", protect, admin, getAllRegistrations);

module.exports = router;

const Registration = require("../models/Registration");
const Event = require("../models/Event");

// @route POST /api/registrations/:eventId
// User registers for an event
async function registerForEvent(req, res) {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const alreadyRegistered = await Registration.findOne({
      user: req.user._id,
      event: event._id,
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    const registration = await Registration.create({
      user: req.user._id,
      event: event._id,
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @route GET /api/registrations/my
// Logged-in user's own registrations, populated with event details
async function getMyRegistrations(req, res) {
  try {
    const registrations = await Registration.find({ user: req.user._id }).populate("event");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @route GET /api/registrations
// Admin only - view all registrations across all events
async function getAllRegistrations(req, res) {
  try {
    const registrations = await Registration.find()
      .populate("event")
      .populate("user", "name email");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerForEvent,
  getMyRegistrations,
  getAllRegistrations,
};

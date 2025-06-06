const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  meetinglink: {
    type: String,
    required: true,
  },
});

const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;

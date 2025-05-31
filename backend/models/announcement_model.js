const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  roles: { type: [String], enum: ['owner', 'manager', 'trainer', 'customer'], required: true },
});

module.exports = mongoose.model('Announcement', announcementSchema);

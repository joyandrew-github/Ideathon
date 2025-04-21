const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  secure: { type: Boolean, default: false },
  voice: String, // Optional: for voice recording storage
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);

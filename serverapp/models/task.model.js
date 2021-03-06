const mongoose = require('mongoose');

const Task = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  holder: { type: mongoose.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', Task);

const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('User', User);

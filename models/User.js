const mongoose = require('mongoose');

// MongoDB Schema for the Task collection
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    dunique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [
    {
        type: mongoose.Types.ObjectId,
        ref: "Task"
    },]
});

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

// MongoDB Schema for the Task collection
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true 
  },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', TaskSchema);
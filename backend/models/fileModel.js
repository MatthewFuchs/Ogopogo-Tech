const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'assignments',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  storageName: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('files', fileSchema);

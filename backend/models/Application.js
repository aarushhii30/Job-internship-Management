const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeLink: { type: String, required: true },
  coverNote: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Selected', 'Rejected'],
    default: 'Applied',
  },
  appliedAt: { type: Date, default: Date.now },
}, { timestamps: true });

applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);

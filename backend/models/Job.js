const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  skills: [{ type: String, trim: true }],
  type: { type: String, enum: ['Internship', 'Job'], required: true },
  location: { type: String, trim: true },
  stipend: { type: String, trim: true },
  duration: { type: String, trim: true },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

jobSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Job', jobSchema);

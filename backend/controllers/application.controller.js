const Application = require('../models/Application');
const Job = require('../models/Job');

exports.apply = async (req, res) => {
  const { jobId, name, email, resumeLink, coverNote } = req.body;
  const job = await Job.findById(jobId);
  if (!job || !job.isActive) return res.status(400).json({ message: 'Job not available' });
  try {
    const app = await Application.create({
      userId: req.user._id, jobId, name, email, resumeLink, coverNote,
    });
    res.status(201).json(app);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ message: 'Already applied' });
    throw e;
  }
};

exports.myApplications = async (req, res) => {
  const apps = await Application.find({ userId: req.user._id })
    .populate('jobId')
    .sort({ createdAt: -1 });
  res.json(apps);
};

exports.allApplications = async (req, res) => {
  const { status, jobId } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (jobId) filter.jobId = jobId;
  const apps = await Application.find(filter)
    .populate('jobId')
    .populate('userId', 'name email role')
    .sort({ createdAt: -1 });
  res.json(apps);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  if (!['Applied', 'Shortlisted', 'Selected', 'Rejected'].includes(status))
    return res.status(400).json({ message: 'Invalid status' });
  const app = await Application.findByIdAndUpdate(
    req.params.id, { status }, { new: true }
  );
  if (!app) return res.status(404).json({ message: 'Application not found' });
  res.json(app);
};

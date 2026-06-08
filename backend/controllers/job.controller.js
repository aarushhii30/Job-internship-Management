const Job = require('../models/Job');

exports.list = async (req, res) => {
  const { q, type, location, active } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (location) filter.location = new RegExp(location, 'i');
  if (active === 'true') filter.isActive = true;
  if (active === 'false') filter.isActive = false;
  if (q) filter.$or = [
    { title: new RegExp(q, 'i') },
    { description: new RegExp(q, 'i') },
    { skills: new RegExp(q, 'i') },
  ];
  const jobs = await Job.find(filter).sort({ createdAt: -1 });
  res.json(jobs);
};

exports.getOne = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
};

exports.create = async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(job);
};

exports.update = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
};

exports.remove = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json({ ok: true });
};

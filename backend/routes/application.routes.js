const router = require('express').Router();
const c = require('../controllers/application.controller');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, c.apply);
router.get('/me', protect, c.myApplications);
router.get('/', protect, adminOnly, c.allApplications);
router.put('/:id/status', protect, adminOnly, c.updateStatus);

module.exports = router;

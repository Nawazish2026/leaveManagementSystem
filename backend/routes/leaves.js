import express from 'express';
import LeaveRequest from '../models/LeaveRequest.js';
import { protect, employerOnly } from '../middleware/auth.js';

const router = express.Router();

// @desc    Apply for a leave
// @route   POST /api/leaves
// @access  Private (Employee or Employer)
router.post('/', protect, async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({ message: 'Start date cannot be after end date' });
    }

    const leaveRequest = await LeaveRequest.create({
      employeeId: req.user._id,
      leaveType,
      startDate: start,
      endDate: end,
      reason
    });

    res.status(201).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get user's leaves
// @route   GET /api/leaves/my
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ employeeId: req.user._id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all leaves
// @route   GET /api/leaves
// @access  Private/Employer
router.get('/', protect, employerOnly, async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({})
      .populate('employeeId', 'name email')
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update leave status
// @route   PUT /api/leaves/:id/status
// @access  Private/Employer
router.put('/:id/status', protect, employerOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const leaveRequest = await LeaveRequest.findById(req.params.id);

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leaveRequest.status = status;
    const updatedLeave = await leaveRequest.save();

    res.json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

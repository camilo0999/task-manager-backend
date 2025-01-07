const express = require('express');
const { getUsers, blockUser, unblockUser, getTasks, dataAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/users/:id', authMiddleware, getUsers);
router.get('/tasks/:id', authMiddleware, getTasks);
router.get('/data/:id', authMiddleware, dataAdmin);
router.put('/block/:id/:id2', authMiddleware, blockUser);
router.put('/unblock/:id/:id2', authMiddleware, unblockUser);

module.exports = router;
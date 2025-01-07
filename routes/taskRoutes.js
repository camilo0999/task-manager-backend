const express = require('express');
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getTasks);
router.put('/complete/:id', authMiddleware, completeTask);
router.get('/:id', authMiddleware, getTaskById);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;

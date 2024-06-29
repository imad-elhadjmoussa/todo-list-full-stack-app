
const { Router } = require('express');
const router = Router();

const {
    getAllTasks,
    getTasksByStatus,
    deleteTask,
    updateTask,
    addTask,
    getTaskByDate
} = require('../controllers/task')

router.get('/date', getTaskByDate);

router.get('/all', getAllTasks);

router.get('/status', getTasksByStatus);

router.put('/update', updateTask);

router.post('/add', addTask);

router.delete('/delete', deleteTask);

module.exports = router;
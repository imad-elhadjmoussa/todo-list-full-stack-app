
const { pool } = require('../db/db');

const getTaskByDate = async (req, res) => {
    try {
        const { user_id, due_date } = req.query;
        const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ? AND due_date = ?', [user_id, due_date]);
        res.send({ tasks: rows });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const { user_id } = req.query;
        const q = `
            SELECT due_date,COUNT(*) as nbr_tasks FROM  tasks 
            WHERE user_id= ?
            GROUP BY due_date
            ORDER BY due_date`;
        const [rows1] = await pool.query(q, [user_id]);
        const allTasks = await Promise.all(rows1.map(async (row) => {
            const q = `
                SELECT * FROM tasks 
                WHERE user_id = ? AND due_date = ?`;
            const [rows2] = await pool.query(q, [user_id, row.due_date]);
            return {
                tasks: rows2,
                due_date: row.due_date,
                nbr_tasks: row.nbr_tasks
            }
        }))
        res.send({ tasks:allTasks });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getTasksByStatus = async (req, res) => {
    try {
        const { user_id, status } = req.query;
        const q = `
            SELECT due_date,COUNT(*) as nbr_tasks FROM  tasks 
            JOIN TaskStatus ON TaskStatus.status_id = tasks.status_id
            WHERE user_id= ? AND status = ?
            GROUP BY due_date
            ORDER BY due_date`;
        const [rows1] = await pool.query(q, [user_id, status]);
        const allTasks = await Promise.all(rows1.map(async (row) => {
            const q = `
            SELECT * FROM tasks 
            JOIN TaskStatus ON TaskStatus.status_id = tasks.status_id
            WHERE status=? AND user_id = ? AND due_date = ?`;
            const [rows2] = await pool.query(q, [status, user_id, row.due_date]);
            return {
                tasks: rows2,
                due_date: row.due_date,
                nbr_tasks: row.nbr_tasks
            }
        }))
        res.send({ tasks: allTasks });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { task_id } = req.body;
        await pool.query('DELETE FROM tasks WHERE task_id = ?', [task_id]);
        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { task_id, description, due_date, category_id, status_id, user_id } = req.body;
        const q = `
            UPDATE tasks 
            SET description = ?, due_date = ?, category_id = ?, status_id = ? 
            WHERE task_id = ? AND user_id = ?`;
        await pool.query(q, [description, due_date, category_id, status_id, task_id, user_id]);
        res.send({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const addTask = async (req, res) => {
    try {
        const { description, due_date, category_id, status_id, user_id } = req.body;
        const q = `
            INSERT INTO tasks (description, due_date, category_id, status_id, user_id) 
            VALUES (?, ?, ?, ?, ?)`;
        await pool.query(q, [description, due_date, category_id, status_id, user_id]);
        res.send({ message: 'Task added successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getTaskByDate,
    getAllTasks,
    getTasksByStatus,
    deleteTask,
    updateTask,
    addTask
}
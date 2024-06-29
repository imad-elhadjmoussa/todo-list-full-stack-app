
const { pool } = require('../db/db');

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const row = await pool.query('SELECT * FROM users WHERE id= ? ', [id]);
        if (row.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user: row[0][0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, cover, updated_at } = req.body;
        const query = 'SELECT * FROM users WHERE email = ?';
        const results = await pool.query(query, [email]);
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exsit' });
        }
        const q = `
            UPDATE users 
            SET username = ?, email = ?, cover = ?, updated_at = ? WHERE id = ? `;
        const row = await pool.query(q, [username, email, cover, updated_at, id]);
        if (row.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getUser, updateUser };   
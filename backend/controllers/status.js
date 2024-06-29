
const { pool } = require('../db/db')

const getStatus = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM taskStatus');
        res.status(200).json({ status: rows});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getStatus
}
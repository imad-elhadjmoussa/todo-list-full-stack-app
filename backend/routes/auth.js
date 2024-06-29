
const { Router } = require('express');
const router = Router();

const { pool } = require("./../db/db")

const { verfiyToken } = require('../middleware/auth');

const { login, createUser } = require('../controllers/auth');

router.post('/login', login);

router.put('/createUser', createUser);

router.get('/virifyToken', verfiyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const [row] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        console.log(row)
        res.status(200).json({ user: row[0] });
    } catch (error) {
        res.status(500).json({error:error.message});
    }

})

module.exports = router;
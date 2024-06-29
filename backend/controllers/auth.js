
const { pool } = require('../db/db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// Login
const login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;
        // Check if email exists
        const [row] = await pool.query('SELECT * FROM users WHERE email = ? ', [email]);
        if (row.length === 0) {
            return res.status(401).json({ message: 'Invalid Email' });
        } else {
            // Check if password is correct
            const hashedPassword = row[0].password;
            const validPassword = await bcrypt.compare(password, hashedPassword);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            // Login successful
            // Create token
            const user=row[0];
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token);
            res.status(200).json({ message: 'Login successful'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Create user
const createUser = async (req, res) => {
    try {
        // Get username, email and password from request body
        const { username, email, password,cover,created_at } = req.body;
        // Check if email already exists
        const [row] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (row.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Create & insert new user
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query('INSERT INTO users (username,email, password,created_at,cover) VALUES (?,?,?,?,?)', [username, email, hashedPassword,created_at,cover]);
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login,
    createUser
}   
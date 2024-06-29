
require('dotenv').config();

const jwt = require('jsonwebtoken');

const verfiyToken = (req, res, next) => {
    // const token = req.header("Authorization").split(' ')[1];
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

module.exports = { verfiyToken }; 
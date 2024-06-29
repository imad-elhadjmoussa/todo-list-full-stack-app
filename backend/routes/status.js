

const { Router } = require('express');
const router = Router();

const { getStatus } = require('../controllers/status');

router.get('/', getStatus); 

module.exports = router;
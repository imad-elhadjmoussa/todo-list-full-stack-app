
const { Router } = require('express');
const router = Router();

const { getUser,updateUser } = require('./../controllers/user');

router.get('/:id',getUser);

router.put('/:id',updateUser);

module.exports = router;

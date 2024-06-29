
const {Router}=require('express');
const router=Router();

const {getCategories}=require('../controllers/categories');

router.get('/',getCategories);

module.exports=router;

const {pool} =require('../db/db');  

const getCategories=async(req,res)=>{
    try{
        const [rows]=await pool.query('SELECT * FROM categories');
        res.status(200).json({categories:rows});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={
    getCategories
}
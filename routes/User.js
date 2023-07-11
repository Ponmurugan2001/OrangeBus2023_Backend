const router=require('express').Router()

const {createUser}=require("../controllers/User")



http://localhost:9000/api/user/register
router.post('/register',createUser);


module.exports=router;
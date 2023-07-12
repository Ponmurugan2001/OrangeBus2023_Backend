const router=require('express').Router()

const {createUser,loginUser}=require("../controllers/User")




http://localhost:9000/api/user/register
router.post('/register',createUser);
router.post('/login',loginUser);


module.exports=router;
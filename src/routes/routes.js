const express=require('express')
const router=express.Router()
const {createuser}=require("../controller/userController")

router.post("/register",createuser)

module.exports=router
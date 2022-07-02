const express=require('express')
const router=express.Router()
const {createuser}=require("../controller/userController")
const{createbook}=require("../controller/bookController")

router.post("/register",createuser)
router.post("/books",createbook)

module.exports=router
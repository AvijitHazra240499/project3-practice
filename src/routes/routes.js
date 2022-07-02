const express=require('express')
const router=express.Router()
const {createuser}=require("../controller/userController")
const{createbook,getBooks}=require("../controller/bookController")

router.post("/register",createuser)
router.post("/books",createbook)
router.get("/books",getBooks)


module.exports=router
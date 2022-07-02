const express=require('express')
const router=express.Router()
const {createuser}=require("../controller/userController")
const{createbook,getBooks,getBooksById,updatedetails}=require("../controller/bookController")
const{createreview}=require("../controller/reviewController")

router.post("/register",createuser)
router.post("/books",createbook)
router.get("/books",getBooks)
router.post("/books/:bookId/review",createreview)
router.get("/books/:bookId",getBooksById)
router.put("/books/:bookId",updatedetails)
module.exports=router
const express=require('express')
const router=express.Router()
const {createuser}=require("../controller/userController")
const{createbook,getBooks,getBooksById,updatedetails,deletebook}=require("../controller/bookController")
const{createreview,updateReview,deleteReview}=require("../controller/reviewController")

router.post("/register",createuser)
router.post("/books",createbook)
router.get("/books",getBooks)
router.post("/books/:bookId/review",createreview)
router.get("/books/:bookId",getBooksById)
router.put("/books/:bookId",updatedetails)
router.delete("/books/:bookId",deletebook)
router.put("/books/:bookId/review/:reviewId",updateReview)
router.delete("/books/:bookId/review/:reviewId",deleteReview)
module.exports=router
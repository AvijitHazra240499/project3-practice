const reviewmodel = require("../models/reviewmodel")
const mongoose = require("mongoose")


const bookmodel = require("../models/bookmodel")
const usermodel = require("../models/usermodel")
const { isvalidString, isvalidbody, isvalid, isvalidnumber } = require("./validator")

const createreview = async function (req, res) {
    try {
        let data = req.body
        let idparams = req.params.bookId
        if (!isvalidbody(data)) {
            return res.status(400).send({ status: false, message: "data not found,plz enter req details" })
        }
        // if (!isvalid(idparams)) {
        //     return res.status(400).send({ status: false, message: "data not found,plz enter req details" })
        // }
        if (!mongoose.isValidObjectId(idparams)) {
            return res.status(400).send({ status: false, message: "Id is not valid" })
        }

        let { reviewedBy, review, rating } = data
        if (!isvalid(reviewedBy)) {
            return res.status(400).send({ status: false, message: "plz enter reviewBy details" })
        }

        if ( !rating) {
            return res.status(400).send({ status: false, message: "plz enter rating " })
        }
      
        
        if (["1","2","3","4","5",1,2,3,4,5].indexOf(data.rating)==-1) {
            return res.status(400).send({ status: false, message: "plz enter rating within 1 to 5" })
        }


        const user = await reviewmodel.create({ ...data, bookId: idparams, reviewedAt: new Date })

        res.status(201).send({ status: true, data: user })


    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const updateReview=async (req,res)=>{
    try{
    const bookId=req.params.bookId
    const reviewId=req.params.reviewId
    let data=req.body
    const{review,rating,reviewedBy}=data

    if (!mongoose.isValidObjectId(reviewId)) {
        return res.status(400).send({ status: false, message: "reviewId is not valid" })
    }
    if (!mongoose.isValidObjectId(bookId)) {
        return res.status(400).send({ status: false, message: "bookId is not valid" })
    }
    

    if (!isvalid(review)) {
        return res.status(400).send({ status: false, message: "plz enter review" })
    }
  if([1,2,3,4,5,"1","2","3","4","5"].indexOf(data.rating)==-1){
    return res.status(400).send({ status: false, message: "plz enter rating from 1 to 5" })
  }

    if (!isvalid(reviewedBy)) {
        return res.status(400).send({ status: false, message: "plz enter reviewedBy" })
    }

    const reviewbookId=await reviewmodel.findOne({_id:reviewId,isDeleted:false})
    if(!reviewbookId){
        return res.status(404).send({status:false, msg: `This review id not found.`})
    }
    if (bookId != reviewbookId.bookId) {
        return res.status(404).send({status:false, msg: "This review not belongs to this particular book."})
     }

    const updateReview=await reviewmodel.findOneAndUpdate({_id:reviewId,isDeleted:false},{
        review,rating,reviewedBy
    },{new:true})
        res.status(200).send({ status: true,data:updateReview })


    }catch(err){
        res.status(500).send({ status: false,message:err.message })

    }
}

const deleteReview=async function(req,res){
    try{
     const bookId=req.params.bookId
     const reviewId=req.params.reviewId

     if (!mongoose.isValidObjectId(reviewId)) {
        return res.status(400).send({ status: false, message: "reviewId is not valid" })
    }
    if (!mongoose.isValidObjectId(bookId)) {
        return res.status(400).send({ status: false, message: "bookId is not valid" })
    }

     const reviewbookId=await reviewmodel.findOne({_id:reviewId,isDeleted:false})
    if(!reviewbookId){
        return res.status(404).send({status:false, msg: `This review id not found.`})
    }
    if (bookId != reviewbookId.bookId) {
        return res.status(404).send({status:false, msg: "This review not belongs to this particular book."})
     }
     
     const deletereview=await reviewmodel.findOneAndUpdate({_id:reviewId,isDeleted:false},{isDeleted:true,deletedAt:new Date()},{new:true})
     
     res.status(200).send({ status: true,data:deletereview})

    }catch(err){
        res.status(500).send({ status: false,message:err.message })
}
}
module.exports = { createreview,updateReview,deleteReview}
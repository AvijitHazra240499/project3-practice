const Bookmodel = require("../models/bookmodel")
const reviewmodel=require("../models/reviewmodel")
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose")
const { getBooksById } = require("../controller/bookController")


const authentication=(req,res,next)=>{
    try{
let  token=req.headers["x-api-key"]
if(!token){
  return  res.status(400).send({ status: false, message: "token is not present"})

}
let decodetoken=jwt.verify(token,"This-is-a-secret-key")
if(!decodetoken){
    return  res.status(401).send({ status: true, message: "authetication not successfull"})

}

next()


    }catch(err){
        res.status(500).send({ status: false, message: err.message })

    }
}


const authorisation=async(req,res,next)=>{
    try{
     const token=req.headers["x-api-key"]
     if(!token){
        return res.status(400).send({ status: false, message: "token not found"})

     }
     const bookId=req.params.bookId
     //for createuser we are taking userId from body
     const userId=req.body.userId
     if (!mongoose.isValidObjectId(bookId)) {
        return res.status(400).send({ status: false, message: "Id is not valid" })
    }

     const getbooks=await Bookmodel.findOne({_id:bookId,userId:userId})
     let decodetoken=jwt.verify(token,"This-is-a-secret-key")
     //authorizATION checking
     if(getbooks.userId!=decodetoken.userId){
        return res.status(403).send({ status: false, message: "authorisation failed"})

     }
     if(!decodetoken){
       return res.status(403).send({ status: false, message: "authorisation not successfull"})
     }
     next()
    }catch(err){
       return res.status(500).send({ status: false, message: err.message })

    }
}
module.exports={authentication,authorisation}
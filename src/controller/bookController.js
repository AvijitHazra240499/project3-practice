const Bookmodel = require("../models/bookmodel")
const reviewmodel=require("../models/reviewmodel")
const { isvalid, isvalidbody, isvalidnumber,isvalidString } = require("./validator")
const mongoose=require("mongoose")

const createbook = async function (req, res) {
    try {
        let data = req.body
        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data
        if (!isvalidbody(data)) {
            return res.status(400).send({ status: false, message: "no data found" })
        }

        if (!isvalid(title)) {
            return res.status(400).send({ status: false, message: "plz enter title" })
        }
        if (!isvalid(excerpt)) {
            return res.status(400).send({ status: false, message: "plz enter excerpt" })
        }
        if (!isvalid(userId)) {
            return res.status(400).send({ status: false, message: "plz enter userId" })
        }
        if (!isvalid(ISBN)) {
            return res.status(400).send({ status: false, message: "plz enter ISBN" })
        }
        if (!isvalid(category)) {
            return res.status(400).send({ status: false, message: "plz enter category" })
        }

        if (Array.isArray(subcategory)) {
            if (subcategory.length === 0) {
                return res.status(400).send({ status: false, message: "plz enter subcategory as a empty array" })
            }
            data["subcategory"] = [...subcategory]
            //it's checking subcategory as a string
        } else if (isvalid(subcategory)) {

            data["subcategory"] = subcategory.trim()
        } else {
            return res.status(400).send({ status: false, message: "plz enter subcategory as a empty string" })
        }
        if (!isvalid(releasedAt)) {
            return res.status(400).send({ status: false, message: "plz enter releasedAt" })
        }



        const book = await Bookmodel.create(data)
        return res.status(201).send({ status: true, data: book })


    } catch (err) {
       return res.status(500).send({ status: false, message: err.message })

    }
}

const getBooks = async function (req, res) {

    try {
        let query = req.query
        let { userId, subcategory, category } = query

        let obj={}
        
        
        if (!isvalidbody(query)) {
            return res.status(400).send({ status: false, message: "no data found" })
        }
        
        if (isvalid(userId)) {
            obj.userId=userId
        }
    
       if (isvalid(category)) {
           obj.category=category 
    }
    console.log(Object.prototype.toString.call(subcategory))
      

          
            //it's checking subcategory as a string
         if (isvalidString(subcategory)) {
            let a=subcategory.trim().split(",").map(x=> x.trim())
            console.log(a)
        obj.subcategory= {$all:a}
        }


      if(Object.keys(obj).length==0){
           return res.status(409).send({ status: false })

        }
        // obj.isDeleated=false

        const books = await Bookmodel.find({...obj,isDeleted:false}).select({createdAt:0,updatedAt:0,__v:0,subcategory:0,isDeleated:0})
        if(!books.length){
            return res.status(408).send({ status: false,message:"there is no book found" })

        }
       return res.status(200).send({ status: true, query:books })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const getBooksById=async function(req,res){
    try{
        const bookId=req.params.bookId
          
      if (!mongoose.isValidObjectId(bookId)) {
        return res.status(400).send({ status: false, message: "Id is not valid" })
    }

      let allbooks=await Bookmodel.findOne({_id:bookId,isDeleated:false}).lean().select({__v:0})
      if(!allbooks){
        return res.status(400).send({ status: false, message: "books not found" })

      }
      let review=await reviewmodel.find({bookId:bookId,isDeleated:false}).select({createdAt:0,updateAt:0,__v:0})
     

    
      
    //   let r=await internModel.find({collegeId:collegeId},{_id:1,updatedAt:0,createdAt:0,isDeleted:0,__v:0,collegeId:0}).lean()
      allbooks.reviewsData=[...review]

      console.log(allbooks.reviewsData)
      console.log(allbooks)
     return res.status(200).send({ status: true,bookId:allbooks})

       }catch(err){
        res.status(500).send({ status: false, message: err.message })
 
    }

}

const updatedetails=async function(req,res){
    try{
     const data=req.params.bookId
     const requestbody=req.body
     const{title,excerpt,releaseAt,ISBN}=requestbody

     if (!isvalidbody(requestbody)) {
        return res.status(400).send({ status: false, message: "body can't be empty " })
    }
    // it's checking whether id given or not
    // if(!isvalid(data)){
    //     return res.status(400).send({ status: false, message: "plz dont provide empty Id params" })
    // }
    //id is checking whether valid or not
    
    if (!mongoose.isValidObjectId(data)) {
        return res.status(400).send({ status: false, message: "Id is not valid" })
    }
    let obj={}
    if(isvalid(title)){
       obj.title=title.trim()
    }
    if(isvalid(excerpt)){
     obj.excerpt=excerpt.trim()
    }
    if(isvalid(releaseAt)){
        obj.releaseAt=releaseAt.trim()
    }
    if(isvalid(ISBN)){
     obj.ISBN=ISBN.trim()
    }
    if(!isvalidbody(obj)){
        return res.status(200).send({ status: false, message:"you can update by only ISBN,releaseAt,title,excerpt" })
}
     
     let updateBook=await Bookmodel.findByIdAndUpdate(data,obj,{new:true})
     res.status(200).send({ status: false, requestbody:updateBook })

    }catch(err){
        return res.status(500).send({ status: false, message: err.message })

    }
}

const deletebook=async function(req,res){
    try{
        let idparams=req.params.bookId
        if (!mongoose.isValidObjectId(idparams)) {
            return res.status(400).send({ status: false, message: "Id is not valid" })
        }
        let deletedbook=await Bookmodel.updateMany({_id:idparams,isDeleted:false},{isDeleted:true,deletedAt:new Date()})
        if(!deletedbook.matchedCount){
            return res.status(404).send({ status: false, message: "no book found" })
        }
        return res.status(200).send({ status: true})

    }catch(err){
        return res.status(500).send({ status: false, message: err.message })

    }
}





module.exports = { createbook,getBooks,getBooksById,updatedetails,deletebook}
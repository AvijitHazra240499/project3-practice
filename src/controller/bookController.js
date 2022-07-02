const bookmodel = require("../models/bookmodel")
const Bookmodel = require("../models/bookmodel")
const { isvalid, isvalidbody, isvalidnumber,isvalidString } = require("./validator")

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
        res.status(201).send({ status: false, data: book })


    } catch (err) {
        res.status(500).send({ status: false, message: err.message })

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
            let a=subcategory.trim().split(",").map(x=>{x.trim()})
            console.log(a)
        obj.subcategory= a
        }


      if(Object.keys(obj).length==0){
           return res.status(409).send({ status: false })

        }
        // obj.isDeleated=false

        const books = await bookmodel.find({...obj,isDeleted:false}).select({createdAt:0,updatedAt:0})
        if(!books.length){
            return res.status(408).send({ status: false,message:"there is no book found" })

        }
       return res.status(200).send({ status: true, query:books })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}






module.exports = { createbook,getBooks }
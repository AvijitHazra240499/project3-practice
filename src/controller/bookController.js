const Bookmodel = require("../models/bookmodel")
const { isvalid, isvalidbody, isvalidnumber } = require("./validator")

const createbook=async function(req,res){
    try{
        let data=req.body
        let{title,excerpt,userId,ISBN,category,subcategory,releasedAt}=data
        if(!isvalidbody(data)){
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
            if(subcategory.length===0){
                return res.status(400).send({ status: false, message: "plz enter subcategory as a empty array" })
            }
          data["subcategory"]=[...subcategory]
        //it's checking subcategory as a string
    }else if(isvalid(subcategory)){
       
        data["subcategory"]=[subcategory.trim()]
    }else{
        return res.status(400).send({ status: false, message: "plz enter subcategory as a empty string" })
    }
        if (!isvalid(releasedAt)) {
            return res.status(400).send({ status: false, message: "plz enter releasedAt" })
        }



        const book=await Bookmodel.create(data)
        res.status(201).send({ status: false, data:book })


    }catch(err){
        res.status(500).send({ status: false, message: err.message })

    }
}
module.exports={createbook}
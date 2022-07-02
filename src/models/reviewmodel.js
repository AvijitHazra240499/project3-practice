const mongoose=require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

const reviewschema=new mongoose.Schema({
    bookId: {type:ObjectId, 
        required:true, 
        refs :"Book"
    },
    reviewedBy: {
        type:String, required:true,
         default:'Guest',
    },
    reviewedAt: {
        type:Date,
        required:true 
    },
    rating: {type:Number, 
        min: 1, max: 5, 
        trim:true},
    review: {type:String,
         trim:true
        },
    isDeleted: {type:Boolean,
         default: false,
         trim:true},
},{timestamp:true})
module.exports=mongoose.model("review",reviewschema)
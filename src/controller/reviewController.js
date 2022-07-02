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
        if (!isvalid(idparams)) {
            return res.status(400).send({ status: false, message: "data not found,plz enter req details" })
        }
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
module.exports = { createreview }
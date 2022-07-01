const usermodel = require("../models/usermodel")

const isvalid = function (x) {
    if (typeof x === "undefined" || typeof x === null) return false
    if (typeof x === "string" && x.trim().length === 0) return false
    return true
}

const isvalidbody = function (x) {
    return Object.keys(x).length > 0
}

const createuser = async function (req, res) {
    try {
        let data = req.body
        if(!isvalidbody(data)){
            return res.status(400).send({ status: false, message: "data not found,plz enter req details" })
        }
        let { title, name, phone, email, password, address } = data
        
        
        if(isvalidbody(address)){
            let {street,city,pincode}=address
            if(!/^(?:[a-zA-Z])+$/.test(city)){
                return res.status(400).send({ status: false, message: "plz enter street with only alphabet" })
            }

            if (!isvalid(city)) {
                return res.status(400).send({ status: false, message: "plz enter city" })
             }
             if (!isvalid(street)) {
                return res.status(400).send({ status: false, message: "plz enter address" })
             }
             if (!isvalid(pincode)) {
                return res.status(400).send({ status: false, message: "plz enter address" })
             }
    

        }

        if (!isvalid(title)) {
            return res.status(400).send({ status: false, message: "plz enter title" })
        }
        if (!isvalid(name)) {
            return res.status(400).send({ status: false, message: "plz enter name" })
        }
        if (!isvalid(phone)) {
           return res.status(400).send({ status: false, message: "plz enter phone" })
        }
        if (!isvalid(email)) {
           return res.status(400).send({ status: false, message: "plz enter email" })
        }
        if (!isvalid(password)) {
            return res.status(400).send({ status: false, message: "plz enter password" })
         }
        
         
        
         
        const user = await usermodel.create(data)




        res.status(201).send({ status: true, data: user })


    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = { createuser }

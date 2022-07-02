const usermodel = require("../models/usermodel")
const { isvalid, isvalidbody, isvalidnumber } = require("./validator")




const createuser = async function (req, res) {
    try {
        let data = req.body
        if (!isvalidbody(data)) {
            return res.status(400).send({ status: false, message: "data not found,plz enter req details" })
        }
        let { title, name, phone, email, password, address } = data


        if (isvalidbody(address)) {
            let { street, city, pincode } = address

        

           if (!isvalid(city)) {
                return res.status(400).send({ status: false, message: "plz enter city" })
            }
            if (!isvalid(street)) {
                return res.status(400).send({ status: false, message: "plz enter address" })
            }
            if (!isvalid(pincode)) {
                return res.status(400).send({ status: false, message: "plz enter address" })
            }
            if(!/^[1-9][0-9]{5}$/.test(pincode)){
                return res.status(400).send({ status: false, message: "plz enter pincode in right format" }) 
            }
        }



        if (!isvalid(email)) {
            return res.status(400).send({ status: false, message: "plz enter email" })
        }
        if (!isvalid(password)) {
            return res.status(400).send({ status: false, message: "plz enter password" })
        }
     




        if (!isvalid(title)) {
            return res.status(400).send({ status: false, message: "plz enter title" })
        }
        if (!isvalid(name)) {
            return res.status(400).send({ status: false, message: "plz enter name" })
        }
        if (!isvalid(phone)|| !isvalidnumber(phone)) {
            return res.status(400).send({ status: false, message: "plz enter phone" })
        }
     

           // checking validation of email and password
           if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: "plz enter email in right format" })
        }

        if (!/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password)) {
            return res.status(400).send({ status: false, message: "plz enter valid password with atleast one uppercase and one lowercase and one charecter and one number" })
        }
        if(!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(phone)){
            return res.status(400).send({ status: false, message: "plz enter phone in right format" })  
        }




        const user = await usermodel.create(data)




        res.status(201).send({ status: true, data: user })


    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = { createuser }

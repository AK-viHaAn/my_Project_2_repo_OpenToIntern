



const isValid = function (value) { // function for name validation

    if (typeof value == 'undefined' || value == 'null')
        return false
    let nameCheck = /^[a-zA-Z]+$/.test(value)
    if (nameCheck == false) {
        return false
    }
    if (typeof value == 'string' && value.trim().length >= 1)
        return true

}

const createCollage = async function (req, res) {
    const { name,email,logoLink } = req.body
    try {
        if (!name || !email || !logoLink) {
            return res.status(400).send({ status: false, msg: "all field is required" })
        }
        // name validation
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Please provide a valid name." })
        }
        let nameC = req.body.name.toUpperCase
        if (!nameC){
            return res.status(400).send({ status: false, msg: "Please provide name in lowercase"})
        }
        // making mail unique
        const CheckMail = await collageModel.findOne({ email: email })
        if (CheckMail) {
            return res.status(400).send({ status: false, msg: "mail is already exist." })
        }
        //check mail through regex
        let validMail = /^[A-Za-z.]{2,}@[A-Za-z]{2,}[.]{1}[A-Za-z.]{2,3}$/
        let check = validMail.test(req.body.email)
        if (!check) {
            return res.status(400).send({ status: false, msg: "mail id is not valid" })
        }
       
        else {
            const data = await collageModel.create({ name, email, logoLink })
            return res.status(201).send({ status: true, data: "data created succesfully", data })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


module.exports.createCollage = createCollage
const internModel = require('../model/internModel.js')
// const collegeModel = require()
const collegeModel = require('../model/collageModel')


const createIntern = async function (req, res) {
    let internData = req.body
    if(Object.keys(internData).length==0) return res.status(400).send({status:false,msg:"data is not present"})
    let name = req.body.name
    let mobile = req.body.mobile
    let email = req.body.email
    let collegeName = req.body.collegeName

    try {
        if (!name) 
        { return res.status(400).send({ status: false, msg: "Name field is required" }) }

        if (typeof name !== "string" || name.trim().length === 0)
        { return res.status(400).send({ status: false,msg:"Name is not valid" }) }

        if (!mobile) 
        { return res.status(400).send({ status: false, msg: "mobile is mandatory" }) }
        
        
        // console.log(mobile.length)
        if (mobile.length != 10)
        { return res.status(400).send({ status: false, msg: "Mobile No. must be at least 10 characters" }) }
        
        let uniqueMobile = await internModel.find({ mobile: mobile })
        if (uniqueMobile[0])
        { return res.status(409).send({ status: false, msg: "mobile number Already exists" }) }
        
        if (!email) 
        { return res.status(400).send({ status: false, msg: "Email Id is mandatory" }) }

        function validateEmail(input) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(input);
        }
        if (validateEmail(email) == false) 
        { return res.status(400).send({ status: false, msg: "email format is invalid" }) }

        let uniqueEmail = await internModel.find({ email: email })
        if (uniqueEmail[0]) 
        { return res.status(409).send({ status: false, msg: "email id Already exists" }) }
        
        if(!collegeName)
        { return res.status(400).send({ status: false, msg: "please provide College Name" }) }

        if (typeof collegeName !== "string" || collegeName.trim().length === 0)
        { return res.status(400).send({ status: false,msg:" College Name is not valid" }) }

        collegeName = collegeName.toLowerCase()

        let dataByCollege = await collegeModel.findOne({name: collegeName})
        if(!dataByCollege){return res.status(400).send({status:false, message:"there is no intern with this college name"})} 

        internData.collegeId = dataByCollege._id       
       
        let result = await internModel.create(internData)
        res.status(201).send({status: true, data: result})
    } catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}



module.exports.createIntern = createIntern


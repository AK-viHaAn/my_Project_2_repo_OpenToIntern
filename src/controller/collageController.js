const collegeModel = require('../model/collageModel')
const internModel = require('../model/internModel.js')


const createCollege = async function (req, res) {
    let college = req.body
    if(Object.keys(college).length==0) return res.status(400).send({status:false,msg:"data is not present"})
    let name = req.body.name
    let fullName = req.body.fullName
    let logoLink = req.body.logoLink

    try {
        if (!name) {
            return res.status(400).send({ status: false, msg: "Name field is required" })
        }
        if (typeof name !== "string" || name.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "Name is not valid" })
        }
        name = name.toLocaleLowerCase()
        if (!fullName) {
            return res.status(400).send({ status: false, msg: "fullName field is required" })
        }
        if (typeof fullName !== "string" || fullName.trim().length === 0) {
            return res.status(400).send({ status: false, msg: "fullName is not valid" })
        }
        if (!logoLink) {
            return res.status(400).send({ status: false, msg: "logoLink field is required" })
        }
        else {
            let collegeCreated = await collegeModel.create(college);
           return res.status(201).send({ status: true, data: collegeCreated })
          }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}





const getColleges = async (req, res) => {

    try {
        let data = req.query.collegeName
        if (!data) { return res.status(400).send({ status: false, message: "Please enter college name in URL" }) }

        let collegeData = await collegeModel.findOne({ name: data, isDeleted: false }).select({ isDeleted: 0, __v: 0 }).lean()
        if (!collegeData) { return res.status(404).send({ status: false, message: "College not found by this name" }) }

        let internData = await internModel.find({ collegeId: collegeData._id, isDeleted: false }).select({ collegeId: 0, isDeleted: 0, __v: 0 })
        if (internData.length == 0) { internData = "No intern found" }

        collegeData.interns = internData;
        delete collegeData._id

        res.status(200).send({status:true, data:collegeData})

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports.createCollege = createCollege
module.exports.getColleges = getColleges
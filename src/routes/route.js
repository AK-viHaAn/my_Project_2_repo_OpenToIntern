const express = require("express");
const router = express.Router();
const collegeController = require('../controller/collageController.js')
const internController = require('../controller/internController.js')

router.post("/functionup/colleges", collegeController.createCollege) 
router.post("/functionup/interns", internController.createIntern) 
router.get("/functionup/collegeDetails", collegeController.getColleges) 

  


module.exports = router;
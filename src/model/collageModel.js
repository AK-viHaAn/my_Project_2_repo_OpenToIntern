const mongoose = require('mongoose');

const collageSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    logoLink:{
        type:String,
        required:true,
    },
    isDeleted: {
        type:Boolean,
        default:false,
    },
},{ timestamps: true})

// module.exports = mongoose.model('collegeDetails', collageSchema)  

module.exports =  mongoose.model('CollageDetails', collageSchema);
// module.exports = mongoose.model.CollageDetails || ('CollageDetails', collageSchema)
// module.exports = mongoose.model.CollageDetails
const express = require("express")
const bodyparser = require("body-parser")
const app = express()
const route=require("./routes/route.js")
const mongoose=require("mongoose")

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true }));

mongoose.connect("mongodb+srv://viHAan:vihaan@project2ofroom42.hxl3hfs.mongodb.net/internshipGroup42",
{ useNewUrlParser: true }
)

.then(() =>console.log('mongodb is Connected'))
.catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000,function (){
    console.log('Express app running on port'+ (process.env.PORT || 3000))
  });

  
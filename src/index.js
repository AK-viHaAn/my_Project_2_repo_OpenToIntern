// const express = require('express');
// const bodyparser = require('body-parser')
// const {mongoose} = require('mongoose');
const route = require('./routes/route.js')

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true }));

mongoose.connect('',{
    useNewUrlParser: true
})

.then(() =>console.log('mongodb is Connected'))
.catch(err => console.log(err))

app.use('/', route)

app.listen(3000 , function() {
    console.log('express is running on port 3000')
})
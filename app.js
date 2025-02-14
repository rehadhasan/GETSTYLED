const express = require('express')
const app = express()
const router = require('./src/routes/api')

const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')

const bodyParser = require('body-parser')
const hpp = require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

let URL = process.env.MONGO_URI;
mongoose.connect(URL).then(()=>{
    console.log("Database Connect")
}).catch((err)=>{
    console.log(err)
})

app.use(bodyParser())
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb"}));

let Limiter = rateLimit({windowMs:15*60*1000, max:30000})
app.use(Limiter)

app.use('/api/v1',router)

app.use(express.static('client/dist'))

// Add React Front End Routing
app.get('*', function (req,res) {
    res.sendFile(path.resolve(__dirname,'client', 'dist', 'index.html'))
})

module.exports = app;



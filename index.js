const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/web';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true
});

connect.then((db) => {
    console.log("Connected to mongodb server");
}, (err) => { console.log(err); });

const testRoute = require('./routes/test.js')
const uploadRoute = require('./upload')

const express = new Express();

express.use(bodyParser.json());
express.use(Express.static(__dirname+'/public/uploads')) //setting up for image loading. The folder path
express.use(cors());
express.use('/contact', testRoute);
express.use('/upload', uploadRoute);

express.listen(3000,'localhost', ()=>{
    console.log("Server started at 3000")
})
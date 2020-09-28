const express = require('express');
const app = express();

app.use("/",express.static("./"),(req,res)=>{
res.end("End");
});

module.exports = app;
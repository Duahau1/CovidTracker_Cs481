const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
// the __dirname is the current directory from where the script is running
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port,()=>{
  console.log("server is listening");
});
module.exports = app;

const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const puppeteer = require('puppeteer');
const cors = require('cors');
// the __dirname is the current directory from where the script is running
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/pdf-create',async (req,res)=>{
  let options = {
    headless: true,
    args:[
      '--start-maximized' // you can also use '--start-fullscreen'
   ],
    defaultViewport: {
        width: 1920,
        height: 1080
    },
  };
  let browser = await puppeteer.launch(options);
  let page = await browser.newPage();
  await page.goto('http://http://tic-tac-tovid.herokuapp.com/pdf',{ waitUntil: 'networkidle0'});
  const pdf = await page.pdf({format:'A1'});
  await browser.close();
  res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
  res.send(pdf);  
})
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port,()=>{
  console.log("server is listening");
});
module.exports = app;
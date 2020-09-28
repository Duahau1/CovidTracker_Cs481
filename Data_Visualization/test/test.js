let puppeteer = require('puppeteer');
const { expect }  = require('chai');
let app = require('./server');
app.listen(3001,()=>{
    console.log('server is ready')
})
describe("Testing the Covid19 Tracker",()=>{
    let browser;
    let page;
    let options = {
        headless: true,
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    };
   
    before(async () => {
        browser = await puppeteer.launch(options);
        page = await browser.newPage();
        await page.goto('http://localhost:3001/',{ waitUntil: 'networkidle2'});
    });
    after(async () => {
        await browser.close();
    });
    it('GIVEN the website, it should have correct page title', async () => {
        expect(await page.title()).to.eql('Covid19 Tracker');
    });
    
    it('GIVEN the correct state name, it should have corresponding state chart',async()=>{
        await page.type('#state','Idaho');
        await page.click('#search');
        await page.waitForSelector('.chart');
        let data_length = await page.evaluate(()=>{
            return document.querySelectorAll('.chart > .bar').length;
        })
        await page.waitFor(()=>document.querySelector('#search').getAttribute('disabled')==null);
        await page.click('#search');
        expect(data_length).to.eql(30);
    })
    it('GIVEN the incorrect state name, it should display NOT FOUND',async()=>{
        await page.type('#state','Idahoo');
        await page.click('#search');
        await page.waitForSelector(".ui.error.message");
        let message = await page.evaluate(()=>{
            return document.querySelector(".ui.error.message > div").innerHTML;
        })
        await page.waitFor(()=>document.querySelector('#search').getAttribute('disabled')==null);
        await page.click('#search');
        expect(message).to.eql('Not found');
    })
    it('GIVEN the legend bar, when click on a rect it should only display corresponding states with its color', async ()=>{
        await page.click('#Bar_2');
        await page.waitFor(()=>setTimeout(300))
        let pair = await page.evaluate(()=>{
            return document.querySelector('#Bar_2').getAttribute('style').match(/[^;\s]+/g) ;
        })
        expect(Number(pair[3])).to.eql(1);
        await page.click('#Bar_2');
    })
    it('GIVEN the legend bar, when click on a rect all the other rect should be blurred', async ()=>{
        await page.click('#Bar_2');
        await page.waitFor(()=>setTimeout(300))
        let pair = await page.evaluate(()=>{
            return document.querySelector('#Bar_1').getAttribute('style').match(/[^;\s]+/g) ;
        })
        expect(pair[3]).not.equal(1);
        await page.click('#Bar_2');
    })
    it('GIVEN the legend bar,if the same rect clicked twice, all the rects should not be blurred',async()=>{
        await page.click('#Bar_2',{clickCount:2});
        await page.waitFor(()=>setTimeout(300))
        let pair = await page.evaluate(()=>{
            return document.querySelector('#Bar_1').getAttribute('style').match(/[^;\s]+/g) ;
        })
        expect(Number(pair[3])).to.eql(1);
    })
    


    
   
})

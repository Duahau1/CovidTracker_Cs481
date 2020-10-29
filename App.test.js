const puppeteer = require('puppeteer');
let browser;
let page;
let options = {
    headless: true,
    defaultViewport: {
        width: 1920,
        height: 1080
    },
};
beforeAll(async () => {
    browser = await puppeteer.launch(options);
        page = await browser.newPage();
        await page.goto('http://localhost:3000/',{ waitUntil: 'networkidle0'});

});

describe("Testing the Covid19 Tracker",()=>{
    
        jest.setTimeout(100000);
    
    test('GIVEN the website, it should have correct page title', async () => {
        expect(await page.title()).toBe('Covid19 Tracker');
    });
    test('GIVEN the globe button, when click on it, user will be direct to the globe page',async ()=>{
        let globeClass = await page.evaluate(()=>
        [...document.querySelectorAll('a')].filter(value=>value.getAttribute('href')=='/globe')[0].getAttribute('class').replace(/\s+/g,'.')
        )
        await page.click(String('.'+globeClass));
        expect(page.url()).toBe('http://localhost:3000/globe');
    })

    
})

afterAll(()=>{
   browser.close();
})

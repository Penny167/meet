import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  jest.setTimeout(30000);

  beforeAll(async () => {
//  browser = await puppeteer.launch(); // Use when running tests in headless mode
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
     ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  })

/*  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('div.details'); // This is how we were originally told to select the details div
    const style = await eventDetails.getAttribute('style'); // Apparently this is not a function
    expect(style).toEqual("display: none;")
  }); */
  
  test('An event element is collapsed by default', async () => {
    let style = await page.evaluate(() => { // This function seems to allow you to use normal js selectors to get the element/attribute etc you want to test
      const eventDetails = document.querySelector('div.details');
      style = eventDetails.getAttribute('style');
      return style;  
    });
    expect(style).toEqual("display: none;")
  }); 

/*  test('An event element is collapsed by default', async () => {
    const button = await page.$('.button'); // This is returning an object - but inside the object I can't see an innertext property
    expect(button).toHaveTextContent('Show details');  // This is expecting a node
  }); */

/*  test('An event element is collapsed by default', async () => {
    let button = await page.evaluate(() => {
      const buttonSelector = document.querySelector('.button');
      return buttonSelector;  
    });
    expect(button).toHaveTextContent('Show details');  // Expects button to be a node but is returning undefined
  }); */

  test('An event element expands when the show details button is clicked', async () => {
    await page.click('.Event .button');
    let style = await page.evaluate(() => {
      const eventDetails = document.querySelector('div.details');
      style = eventDetails.getAttribute('style');
      return style;  
    })
    expect(style).toEqual("display: block;")    
  });

  test('An event element collapses when the hide details button is clicked', async () => {
    await page.click('.Event .button');
    const style = await page.evaluate(() => {
      const eventDetails = document.querySelector('div.details');
      const style = eventDetails.getAttribute('style');
      return style;  
    })
    expect(style).toEqual("display: none;")   
  });

  afterAll(() => {
    browser.close();
  })

});

describe('filterEventsByCity', () => {

  test('When opened, events for all cities are shown', async () => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
    const events = await page.$$('.Event');
    expect(events).toHaveLength(12);
    browser.close();
  })
  
}); 
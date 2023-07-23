const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/stock_list');
    await new Promise(r => setTimeout(r, 2000));

    await page.click('input[type=checkbox]');
    await page.click('#root > menu > div > a:nth-child(3)');

    await new Promise(r => setTimeout(r, 2000));
    await page.$eval('#date', el => el.value = '2022-09-12');
    await page.$eval('#number', el => el.value = 2);
    await page.click('button.startBidding');
    const brokerPage = await browser.newPage();
    await brokerPage.goto('http://localhost:8080');

    await brokerPage.evaluate(() => {
        const broker = {
            "id": "1",
            "name": "AAA AAA",
            "money_amount": 1000,
            "balance": 1000
        };

        localStorage.setItem('currentBroker', JSON.stringify(broker));
    });

    await brokerPage.goto('http://localhost:8080/#/AAA%20AAA/broker_page');
    await new Promise(r => setTimeout(r, 2000));

    await new Promise(r => setTimeout(r, 5000));

    const text = await brokerPage.evaluate(() => {
        return document.querySelector('.income_data').innerHTML;
    }).catch(e => console.dir(e));
    console.log(text);
    await browser.close();
    return "";
}

scrape().then((value) => {
    console.log(value); // Получилось!
})
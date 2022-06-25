const URL = "https://www.flipkart.com/search?q=mobile";
const baseURL = "https://www.flipkart.com";
const puppeteer = require("puppeteer");
const Products = require("../model/Products");
const pageURL = "https://www.flipkart.com/search?q=mobile&page=";
const main = async (number) => {
    if (number === 0)
        return;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${pageURL}${number}`);
    let urls = await page.evaluate(() => {
        const result = [];
        let item = document.querySelectorAll("#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div > div > div > div > div > a");
        item.forEach(i => {
            result.push({
                url: `${i.getAttribute('href')}`,
                productShortDetails: i.innerText
            })
        });
        return result;
    });

    for (url of urls) {
        !Products.exists({ productURL: `${baseURL}${url.url}` }) &&
            await Products({
                productURL: `${baseURL}${url.url}`,
                productShortDetails: url.productShortDetails
            }).save();
    }
    console.log("done");
    main(number--);
}
module.exports = main; 
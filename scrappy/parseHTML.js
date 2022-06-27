const cheerio = require("cheerio");

const parseHTML = (html) => {
  const $ = cheerio.load(html);
  const divs = $("._2kHMtA");
  if (divs.html() === null) {
    return null;
  }
  const data = [];
  divs.each((idx, el) => {
    const allAboutPhones = {};
    const derivedHtml = $(el).html();
    const load = cheerio.load(derivedHtml);
    allAboutPhones.url =
      "https://www.flipkart.com" + load("._1fQZEK").attr("href");
    allAboutPhones.imageURL = load("img").attr("src");
    allAboutPhones.name = load("._4rR01T").text();
    allAboutPhones.rating = {};
    allAboutPhones.rating.score = load("._3LWZlK").text();
    allAboutPhones.rating.ratings = load("._2_R_DZ").text();
    allAboutPhones.usp = []; //unique selling point
    load(".fMghEO ul li").each((i, li) => {
      allAboutPhones.usp.push(load(li).text());
    });
    allAboutPhones.price = {};
    allAboutPhones.price.sellingPrice = load("._1_WHN1").text();
    allAboutPhones.price.actualPrice = load("._27UcVY").text();
    allAboutPhones.price.discount = load("._3Ay6Sb").text();

    data.push({
      Product: allAboutPhones.name,
      details: allAboutPhones,
    });
  });
  return data;
};
module.exports = parseHTML;

const axios = require("axios");
const cheerio = require("cheerio");
const fetchData = require("./fetchData");

const main = async () => {
  let page = 1;
  const baseURL = `https://www.snapdeal.com/acors/json/product/get/search/0/${page}/20?q=&keyword=tshirt`;
  var list = [];
  while (page < 2) {
    const htmlData = await fetchData(baseURL);
    const $ = cheerio.load(htmlData);
    const data = $(
      "div.product-tuple-description > div.product-desc-rating > a"
    );
    if (data.length <= 0) {
      break;
    }
    data.each(function (index, element) {
      list.push($(element).attr("href"));
    });
    page++;
    process.stdout.write("fetching " + page + " pages complete... \r");
  }
  console.log(list);
  const productList = [];
  for (let i = 0; i < list.length; i++) {
    const productDetails = {};
    const htmlData = await fetchData(list[i]);
    const $ = cheerio.load(htmlData);
    productDetails.title = $(".pdp-e-i-head").attr("title");
    productDetails.price = $(
      "#buyPriceBox > div.row.reset-margin > div.col-xs-14.reset-padding.padL8 > div.disp-table > div.pdp-e-i-PAY-r.disp-table-cell.lfloat > span.pdp-final-price"
    ).text();
    productDetails.rating = {}; 
    productDetails.rating.overall = $(".avrg-rating").text();
    productDetails.rating.ratings = $(".total-rating").text();
    productDetails.rating.reviews = $(".numbr-review>a").text();
    productList.push(productDetails);
    productDetails.colorAndSizesAvailable = []; 
    $(".attr-val").each((idx, el)=>{
         productDetails.colorAndSizesAvailable.push($(el).text())
    });
    productDetails.highlights = []; 

    $(".dtls-li > span.h-content").each((idx, list)=>{
        productDetails.highlights.push($(list).text())
    })
    const d =     $("#id-tab-container > div > div:nth-child(2) > div.spec-body.specifications > div > table > tbody > tr > td > table > tbody > tr:nth-child(2)").text();
    //edit from here
    console.log(d);
  }
  console.log(productList);

  console.dir(list);
  return "done";
};
main().then(console.log).catch(console.error);

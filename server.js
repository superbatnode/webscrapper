console.clear();
const { fetchData, parseHTML } = require("./scrappy");
const mongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();
const url = process.env.DB_URL;
const client = new mongoClient(url);
const dbName = "ScrappyProject";

//db connection
client
  .connect()
  .then(() => console.log("👉 connected to db"))
  .catch((e) => console.error("❌ can't connect this time"));
const db = client.db(dbName);

const collection = db.collection("Products");

console.log("🤖 bot started scrapping\n");
async function scrap(pageNo) {
  if (pageNo === 0) return "👍 All work done";

  console.log("🚩fetching page from origin");
  const flipkartData = await fetchData(
    `https://www.flipkart.com/search?q=mobile&page=${pageNo}`
  ).catch((e) => console.log("❌ can't fetch data from origin"));

  console.log("👉 Parsing HTML..");
  const results = parseHTML(flipkartData);

  if (!results) console.log("❌ Got nothing from HTML..");
  else {
    console.log("📥 Saving Data into DB");
    results.map(async (result) => {
      try {
        await collection.insertOne(result);
        console.log("📦 Data Saved.");
      } catch (e) {
        console.error("❌ can't save data.");
      }
    });
  }

  return scrap(pageNo - 1);
}

scrap(50)
  .then(() => console.log("🤖 All done"))
  .catch((e) => console.error("🤖 Bot got crash. ", e));

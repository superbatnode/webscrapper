const axios = require("axios");
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    throw new Error("Error in Axios ", e);
  }
};
module.exports = fetchData;

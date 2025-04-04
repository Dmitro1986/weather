require('dotenv').config();

module.exports = {
  apiKey: process.env.API_KEY,
  port: process.env.PORT || 5500,
};
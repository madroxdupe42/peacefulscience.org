require("dotenv").config() 
const { builder } = require("@netlify/functions");
const axios = require('axios');

async function handler(event, context) {
    console.info(event.path);
    
    let amzn_id = event.path.replace(/^.*?bookcover\//, "");
    let headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36'}
    
    let url = `http://images.amazon.com/images/P/${amzn_id}.LZZZZZZZ.jpg`
    console.log(url);
    
    let imageBase64 = '';
  
    imageBase64 = await axios
      .get(url, { responseType: 'arraybuffer', headers })
      .then((response) => Buffer.from(response.data, 'binary').toString('base64'))
//      .catch((e) => reject(e))
  

  return {
    statusCode: 200,
    body: imageBase64,
    isBase64Encoded: true,         
    headers: {
      ttl: 60 * 60 * 24 * 7 * 52
    }
  }
}

exports.handler = builder(handler);
require("dotenv").config() 
const axios = require('axios');
const urljoin = require('url-join');

const baseurl = "https://peacefulscience.org";

exports.handler =  async function(event, context) {
    const url = urljoin(baseurl, event.queryStringParameters.url);
    const docraptor = "https://" + process.env.DOCRAPTOR + "@docraptor.com/docs";
    const params = {"test": true,
           "document_url": url,
           "type": "pdf" ,
           "prince_options": {
             baseurl: baseurl
           }};
           
    let response = await axios.post( docraptor, params, {
      responseType: 'arraybuffer'
    });

    return {
      isBase64Encoded: true,
      statusCode: response.status,
      body: Buffer.from(response.data, 'binary').toString('base64'),
      headers: {
        "content-type": response.headers["content-type"],
        "x-frame-options": 'SAMEORIGIN',
        "x-permitted-cross-domain-policies": 'none',
      }
    }
}
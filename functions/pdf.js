require("dotenv").config() 
const axios = require('axios');
const urljoin = require('url-join');
const util   = require("util");
var os = require('os');
var fs = require('fs');
const Prince = require('prince');

const baseurl = "https://peacefulscience.org";

async function docraptor(url) {
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

async function prince(url) {
  tfile = os.tmpdir()+"output.pdf";
  
  return await Prince()
    .inputs(url)
    .output(tfile)
    .execute()
    .then(function () {
      return fs.readFileSync(tfile, null);
    })
    .then(function (buffer) {    
     return {    
      statusCode: 200,
      isBase64Encoded: true,
      body: buffer.toString('base64') ,
      headers: {
        "x-frame-options": 'SAMEORIGIN',
        "x-permitted-cross-domain-policies": 'none',
      }
    }         
        
    }, function (error) {
      return {
        statusCode: 500,
        body: util.inspect(error)
      }
    })
  
}

exports.handler =  async function(event, context) {

    let url = urljoin(baseurl, event.path.split("/").slice(2).join("/"));

    return prince(url);

}
require("dotenv").config() 
const axios = require('axios');
const urljoin = require('url-join');
const util   = require("util");
var os = require('os');
var fs = require('fs');
const Prince = require('prince');

const baseurl = "https://peacefulscience.org/";

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

async function prince(url, name) {
  let tfile = os.tmpdir()+"/output.pdf";
  let p = Prince();
  
  if (process.env.PRINCE) {
    p.config.binary = process.env.PRINCE;
  } else {
    p.config.binary = "/usr/local/bin/prince"
  }
  
  return await p
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
        "Content-Disposition": `filename="${name}"`,
        "Cache-Control": "max-age: 0, stale-while-revalidate=604800" // 0 days, 7 days
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
    let route = event.path.toLowerCase().split("/");
    let path = route.slice(route.indexOf("pdf")+1, -1);
        
    let url = urljoin(baseurl, "_prince", path.join("/"));
    let title = path.slice(-1)[0];
    let section = path.slice(-2)[0];
    let name = `PS${section}-${title}.pdf`
    
    return prince(url, name);

}

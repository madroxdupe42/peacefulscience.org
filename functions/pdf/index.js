require("dotenv").config() 
const { builder } = require("@netlify/functions");
const axios = require('axios');
const urljoin = require('url-join');
const util   = require("util");
var os = require('os');
var fs = require('fs');
var random = require('random-string-generator');

const Prince = require('prince');

const baseurl = "https://peacefulscience.org/";

async function prince(url) {
  let tfile = os.tmpdir()+"/" + random() + ".output.pdf";
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
     fs.unlinkSync(tfile);
     return {    
      statusCode: 200,
      isBase64Encoded: true,
      body: buffer.toString('base64') ,
    }         
        
    }) 
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

async function handler(event, context) {
    let route = event.path.toLowerCase();
    route = route.endsWith('/') ? route.slice(0, -1) : route;
    
    if (! route.endsWith(".pdf") ) 
	  return {statusCode: 301, headers: {location: `${route}.pdf`}}
	
    route = route.slice(0, -4);
    route = route.split('/');

    let path = route.slice(route.indexOf("pdf")+1);    
    let url = urljoin(baseurl, "_prince", path.join("/"));
    let canurl = urljoin(baseurl, path.join("/"));
    let title = path.slice(-1)[0];
    let section = path[0];
    let name = `${title}.pdf`
    let req_etags = [];
    
    if (! ["articles", "about", "prints"].includes(section) )  {
      return {statusCode: 404}
    }
    
    let headers = event.headers;
    
    if ("if-none-match" in headers) {
       req_etags = headers["if-none-match"];
       req_etags = req_etags.split(",");
       req_etags = req_etags.map(s => replaceAll(s, '"','').trim());
    }
    
    return axios.head(url, headers=headers)
      .then(res => { 
        res_etag = replaceAll(res.headers['etag'], '"','');
        for (req_etag of req_etags) {
          
          if (req_etag.includes(res_etag)) {
            return {
              statusCode: 304,
              headers: {
                "etag": `"${req_etag}"`,
                "cache-control":  res.headers['cache-control'],
                "age":  res.headers['age'],
                "x-nf-request-id": res.headers['x-nf-request-id'],
              }
            }
          }
        }
        
        return prince(url)
          .catch( error => {return {statusCode: 500, body: util.inspect(error)}})
          .then(response => {
            if (response.statusCode === 200)
              response["headers"] = {
                "Content-Disposition": `filename="${name}"`,
                "Cache-Control": res.headers['cache-control'],
                "content-type": "application/pdf",
                "Link": `<${canurl}>; rel="alternate"; type="text/html", <${"https://peacefulscience.org/" + event.path.toLowerCase()}>; rel="canonical"`,
                "Etag": res.headers["etag"],
                "age":  res.headers['age'],
                "x-nf-request-id": res.headers['x-nf-request-id']
               }
            return response;
           })
      })
      .catch (error => {return {statusCode: error.response.status }})
      .then(r => {console.info( `${ r.statusCode }:\t${ url }\t${JSON.stringify(event.headers)}`); return r;} )   
}
     
    
exports.handler = builder(handler);

     
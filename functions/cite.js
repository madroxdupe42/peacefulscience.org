require("dotenv").config() 
const { builder } = require("@netlify/functions");
const axios = require('axios');
const manubot_url = "https://translate.manubot.org/web?single=1&format=csljson";
var urlparse = require('url-parse');


async function doi(DOI) {
      return axios.get(DOI, 
          {headers: {"Accept": "application/vnd.citationstyles.csl+json"}}
        ).then(response => {          
          return axios.get(DOI)
            .then(RES => {
              let url = arse(RES.request.res.responseUrl, true);
              url.set("query", "");
              response.data.URL = url.href;
              return response.data;
            });
        })
}

async function manubot(URL) {
  headers = {"Content-Type": "text/plain"} ;
  return axios.post(manubot_url, URL, { headers }).
      then(response => {
        return response.data[0];
      });
}


async function handler(event, context) {
    console.info(event.path);
    
    let raw_url = event.path.replace(/^.*?cite\//, "");
    
    if (raw_url.startsWith("http")) {
      let url = raw_url.replace(/https?:\/\//, '');
      return { statusCode: 302,
              headers: {
                "location":  "/cite/" + url
              }
      }    
    }
    
    let url = "https://" + raw_url;
    let data = {};
    
    console.log(url);
    
    if (url.startsWith("https://doi.org/")) {
      data = await doi(url);
    } else {
      data = await manubot(url);
        
      let { DOI } = data;
     
      if (DOI !== undefined){     
        return {
          statusCode: 302,
          headers: {
                "location":  `/cite/doi.org/${DOI}`
          }
        }     
      }    
    }
    
    return { statusCode: 200,
             body: JSON.stringify(data),
              headers: {
                "content-type":  "application/json",
                ttl: 60 * 60 * 24 * 7
              }
    }
}

exports.handler = builder(handler);
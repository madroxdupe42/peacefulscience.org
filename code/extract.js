const { parseHTML } = require("linkedom");
const fs = require('fs').promises;
const fg = require('fast-glob');
const extract = new Array();
const jsonld = require("jsonld");

function parsedom(html) {
    const dom = parseHTML(html);
    return dom;
}


async function parse(doc) {
  return JSON.parse(doc);
  
}


async function extr(html) {
 const dom = parsedom(html)
 const document = dom.document;

 for (const elem of document.querySelectorAll("script"))
   if (elem.getAttribute("type") === 'application/ld+json')
     return elem.innerHTML;
  return null;
}

async function extractall(glob) {
  const tasks = [];
  const stream = fg.stream(glob);
  for await (const path of stream) 
    tasks.push(
      fs.readFile(path)
        .then(extr)
        .then(parse)
        .catch(console.error)
    )
    
  const OBJ = [];
  
  for (t of tasks) {
    var j = await t;
    if (j !== null)
      OBJ.push(j);
  }

  console.log(await jsonld.toRDF(OBJ, {format: 'application/n-quads'}));
};
  
  
let globs = process.argv.slice(2);

globs = globs.length ? globs : 'public/**/*.html';


extractall(globs)
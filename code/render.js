const { parseHTML } = require("linkedom");
const vm = require('vm');
const fs = require('fs').promises;
const fg = require('fast-glob');
const classes = new Set();

function parsedom(html) {
    const dom = parseHTML(html);
    dom.context = vm.createContext({
      'window': dom, 
      "document": dom.document, 
      "navigator": dom.navigator,
    });
    return dom;
}

//const twitterjs = fetch("https://platform.twitter.com/widgets.js");

async function twitter(dom) {
  twitterjs
    .then(response => {
        console.log(response)
    });
  return dom;
}

async function dom2html(dom) {
  return dom.document.toString();
}

async function getclasses(dom) {
 for (const elem of dom.document.querySelectorAll("*"))
   elem.classList.forEach(c => classes.add(c));
 return dom;
}

async function runscripts(dom) {
 for (const elem of dom.document.querySelectorAll("script[render]")) 
   vm.runInContext(elem.innerHTML, dom.context);
 return dom;
}

async function remove(dom) {
 for (const elem of dom.document.querySelectorAll("[remove]")) 
   elem.remove();
 return dom;
}

async function render(html) {
 const dom = parsedom(html);

 return runscripts(dom)
   .then(runscripts)
   .then(remove)
   .then(getclasses)
   .then(dom2html)
}

async function renderall(glob) {
  const tasks = [];
  const stream = fg.stream(glob);
  for await (const path of stream) 
    tasks.push(
      fs.readFile(path)
        .then(render)
        .then(fs.writeFile.bind(null, path))
        .catch(e => {console.error(e); throw e;})
    )
  return Promise.all(tasks);
};

let globs = process.argv.slice(2);

globs = globs.length ? globs : 'public/**/*.html';
console.log(globs)

renderall(globs)
.then(r => fs.writeFile("layouts/classes.html", [...classes].join(' ')))

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

async function render(html) {
 const dom = parsedom(html)
 const document = dom.document;

 for (const elem of document.querySelectorAll("*"))
   elem.classList.forEach(c => classes.add(c));

 for (const elem of document.querySelectorAll("script[render]")) 
   try {vm.runInContext(elem.innerHTML, dom.context);}
   catch (e) {console.error(e.stack)};

 for (const elem of document.querySelectorAll("[remove]")) { 
   elem.remove();
     }
 return dom.document.toString();
}

async function renderall(glob) {
  const tasks = [];
  const stream = fg.stream(glob);
  for await (const path of stream) 
    tasks.push(
      fs.readFile(path)
        .then(render)
        .then(fs.writeFile.bind(null, path))
        .catch(console.error)
    )
  return Promise.all(tasks);
};
  
renderall('public/**/*.html')
.then(r => fs.writeFile("layouts/classes.html", [...classes].join(' ')))
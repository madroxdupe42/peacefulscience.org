var plugins = [];
const purgecss = require('@fullhuman/postcss-purgecss')
const importUrl = require('postcss-import-url');


plugins.push(require("postcss-import-url")({"resolveUrls": true}));

plugins.push(purgecss( { fontFace: false, content: [ 'layouts/**/*.html', 'assets/css/main.scss' ], }))

plugins.push(require("autoprefixer"));

plugins.push(require("cssnano")({ preset: 'default', }));

plugins.push(require("postcss-prettify"));

module.exports = {    
  plugins: plugins 
}

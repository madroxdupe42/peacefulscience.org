var plugins = [];
const purgecss = require('@fullhuman/postcss-purgecss')

plugins.push(require("postcss-import-url")({"resolveUrls": true}));

plugins.push(purgecss( { 
  content: ['assets/js/*.js', 'layouts/**/*' ], 
}))

plugins.push(require("autoprefixer"));

plugins.push(require("cssnano"));

module.exports = {    
  plugins: plugins 
}

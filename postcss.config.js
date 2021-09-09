var plugins = [];
const purgecss = require('@fullhuman/postcss-purgecss')


plugins.push(require("autoprefixer"));


plugins.push(purgecss( { fontFace: false, content: [ 'layouts/**/*.html', ], }))


//plugins.push(require("cssnano")({ preset: 'default', }));


module.exports = {    
  plugins: plugins 
}

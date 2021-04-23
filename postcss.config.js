var plugins = [];
const purgecss = require('@fullhuman/postcss-purgecss')


plugins.push(require("autoprefixer"));


//plugins.push(purgecss( {
//       content: [
//        'assets/*',
//        'layouts/**/*.html',
//       ],
//  }))


//plugins.push(require("cssnano")({
//            preset: 'default',
//        }));


module.exports = {    
  plugins: plugins 
}

var plugins = [];
const purgecss = require('@fullhuman/postcss-purgecss')


plugins.push(require("autoprefixer"));

if (process.env.HUGO_ENVIRONMENT === 'production') {
  console.warn("Production Build...");
  plugins.push(purgecss( {
       content: [
        './themes/**/*.html',
        './layouts/**/*.html'
       ]
  }))
}
else { console.warn("NOT Production Build...");
}




module.exports = {    
  plugins: plugins 
}

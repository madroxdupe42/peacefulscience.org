var plugins = {};

if (process.env.HUGO_ENVIRONMENT === 'production') {
  plugins['@fullhuman/postcss-purgecss'] = {
    content: [
      './themes/**/*.html',
      './layouts/**/*.html'
    ]
  }
}

plugins['autoprefixer'] = {};

module.exports = {    
  plugins: plugins 
}

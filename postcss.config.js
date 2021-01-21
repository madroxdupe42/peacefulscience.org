module.exports = {    
  plugins: {        
    '@fullhuman/postcss-purgecss': {
          content: [
             './themes/**/*.html',
             './layouts/**/*.html'
            ],
     } ,
     'autoprefixer': {}
  }
}

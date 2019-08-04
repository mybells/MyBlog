
var path = require('path');
module.exports = {
  title: 'Mybells\'s Blog',
  description: 'Mybells\'s Blog',
  // base:'/',
  head: [
    ['link', { rel: 'icon', href: `https://github.githubassets.com/favicon.ico` }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../docs'),
      }
    }
  }
}
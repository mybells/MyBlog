const utils = require('./utils')
module.exports = {
  title: 'Mybells\'s Log',
  description: 'Mybells\'s Log',
  head: [
    ['link', { rel: 'icon', href: `https://github.githubassets.com/favicon.ico` }]
  ],
  markdown: {
    toc: { includeLevel: [2, 3] }, //[[toc]]包含的级别
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav: [
      { text: 'Blog', link: '/blog/' },
      { text: 'BookStore', link: '/book/' },
      { text: 'MyStars', link: '/mystars/' },
      { text: 'SomeoneStars', link: '/getsomeonestars/' },
      { text: 'CSDN', link: 'https://blog.csdn.net/qwe435541908' },
    ],
    sidebar: utils.inferSiderbars(),
    // sidebar: {
    //   '/blog/': [
    //     {
    //       title: 'Css',
    //       collapsable: false,
    //       children: [
    //         'Css/css3样式效果.md',
    //       ]
    //     }
    //   ]
    // },
    // 假定 GitHub。也可以是一个完整的 GitLab 网址
    repo: 'https://github.com/mybells/MyBlog',
    // 如果你的文档不在仓库的根部
    docsDir: 'docs',
    // 可选，默认为 master
    docsBranch: 'master',
    // 默认为 true，设置为 false 来禁用
    editLinks: false,
    sidebarDepth: 0,
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
  },
  // configureWebpack: {

  // },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      return {
        resolve: {
          alias: {
            '@public': './public'
          }
        },
        devServer: {
          open: true,
          https: true
        }
      }
    }
  },
  plugins: ['@vuepress/back-to-top', '@vuepress/nprogress']
}

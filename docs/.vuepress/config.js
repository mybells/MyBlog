
module.exports = {
  title: 'Mybells\'s Blog',
  description: 'Mybells\'s Blog',
  head: [
    ['link', { rel: 'icon', href: `https://github.githubassets.com/favicon.ico` }]
  ],
    markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    nav: [
      { text: 'CSDN', link: 'https://blog.csdn.net/qwe435541908' },
      { text: 'Github', link: 'https://github.com/mybells' }
    ],
    sidebar: [
      {
        title: 'Javascript',
        children: [
          '/blog/jsblog/js正则表达式分组',
          '/blog/jsblog/for in与for of区别',
        ]
      },
      {
        title: 'Css',
        children: [
          '/blog/cssblog/BFC（Block Formatting Context）块级格式化上下文'
        ]
      }
    ],
    lastUpdated: 'Last Updated' // 文档更新时间：每个文件git最后提交的时间
  }
}

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
      { text: 'Home', link: '/' },
      { text: 'CSDN', link: 'https://blog.csdn.net/qwe435541908' },
    ],
    sidebar: [
      {
        title: 'Vue',
        collapsable: false,
        children: [
          '/blog/vueblog/vue中的watch和data用法',
          '/blog/vueblog/vue自定义指令',
          '/blog/vueblog/vueAPI总结',
          '/blog/vueblog/vuex总结',
        ]
      },
      {
        title: 'Javascript',
        collapsable: false,
        children: [
          '/blog/jsblog/深拷贝与浅拷贝',
          '/blog/jsblog/js正则表达式分组',
          '/blog/jsblog/for in与for of区别',
          '/blog/jsblog/async和promise',
          '/blog/jsblog/class与class继承',
        ]
      },
      {
        title: 'Css',
        collapsable: false,
        children: [
          '/blog/cssblog/BFC（Block Formatting Context）块级格式化上下文'
        ]
      },
      {
        title: 'Other',
        collapsable: false,
        children: [
          '/blog/otherblog/搭建vuepress博客并发布在github.io上',
          '/blog/otherblog/vue和webpack配合常用package',
        ]
      }
    ],
    // 假定 GitHub。也可以是一个完整的 GitLab 网址
    repo: 'https://github.com/mybells/MyBlog',
    // 如果你的文档不在仓库的根部
    docsDir: 'docs',
    // 可选，默认为 master
    docsBranch: 'master',
    // 默认为 true，设置为 false 来禁用
    editLinks: false,
    sidebarDepth:0,
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
  }
}
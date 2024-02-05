const path = require('path')
const fs = require('fs')

const sidebarMap = [
  // { title: 'Someonestars', dirname: 'getsomeonestars', flag: 1 },
  { title: 'Mystars', dirname: 'mystars', flag: 1 },
  { title: 'Blog', dirname: 'blog', flag: 0, collapsable: true },
  { title: 'BookStore', dirname: 'book', flag: 0, collapsable: true },
]
exports.inferSiderbars = () => {
  const sidebar = {}
  sidebarMap.forEach(({ title, dirname, flag, collapsable }) => {
    let dirpath = path.resolve(__dirname, '../' + dirname)
    let key = `/${dirname}/`;
    let children = [];
    if (flag) {
      sidebar[key] = fs.readdirSync(dirpath).map(item => {
        if (item.endsWith('.md') && fs.statSync(path.join(dirpath, item)).isFile()) {
          children.push(item);
          return {
            title,
            children,
            collapsable: collapsable ? true : false
          }
        }
      }).filter(item => item)
    } else {
      sidebar[key] = fs.readdirSync(dirpath).map(item => {
        if (fs.statSync(path.join(dirpath, item)).isDirectory()) {
          title = item;
          children = fs.readdirSync(path.join(dirpath, item)).map(name => {
            if (name.endsWith('.md') && fs.statSync(path.join(path.join(dirpath, item), name)).isFile()) {
              return `${item}/${name}`;
            }
          }).filter(item => item).sort((a, b) => {
            const str1 = a.split('/')[1];
            const str2 = b.split('/')[1];
            if (!Number.isNaN(parseInt(str1)) && !Number.isNaN(parseInt(str2))) {
              return parseInt(str1) - parseInt(str2);
            } else {
              return a - b
            }
          })
          return {
            title,
            children,
            collapsable: collapsable ? true : false
          }
        }
      }).filter(item => item)
    }
  })
  return sidebar
}

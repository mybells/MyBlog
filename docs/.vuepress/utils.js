const path = require('path')
const fs = require('fs')

const sidebarMap = [
  { title: 'Mystars', dirname: 'mystars', flag: 1 },
  { title: 'Blog', dirname: 'blog', flag: 0 },
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
          children = fs.readdirSync(`${dirpath}\\${item}`).map(name => {
            if (name.endsWith('.md') && fs.statSync(path.join(`${dirpath}\\${item}`, name)).isFile()) {
              return `${item}/${name}`;
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
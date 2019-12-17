## 搭建vuepress博客并发布在github.io上

 1. 先在github上新建一个库用来存放博客代码。
 2. 本地拉取这个库。
 3. 用vscode打开项目，在终端执行`npm init -y`初始化项目，然后 `npm i vuepress`安装vuepress包。
 4. 建立如下结构目录和文件
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190809134917107.png)
5. 在package.json中加入以下命令：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190809135237432.png)
6. 执行`npm run dev:docs`就可以看到效果了
7. 要把vuepress博客建立自动推送到github.io上。
8. 先在github上新建一个库`<你的username>.github.io`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190809135604951.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3F3ZTQzNTU0MTkwOA==,size_16,color_FFFFFF,t_70)
9. 建立deploy.sh文件内容为

```js
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build:docs

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init 
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io  USERNAME=你的用户名 
git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```
10. 执行`npm run publish`，就会自动打包然后提交推送到github.io这个库了。
11. 如果没有推送上去，先检查本地有没有SSH key。可以看这个 [https://blog.csdn.net/xb12369/article/details/78682018](https://blog.csdn.net/xb12369/article/details/78682018)，没有的话先生成一个。再执行`npm run publish`。
12. 最后可以查看`https://<username>.github.io/`查看博客。[https://mybells.github.io/](https://mybells.github.io/)这是我的。
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190809140832870.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3F3ZTQzNTU0MTkwOA==,size_16,color_FFFFFF,t_70)
最后我的项目地址[https://github.com/mybells/MyBlog](https://github.com/mybells/MyBlog)，喜欢的点个star哦。
# 第1章 Webpack简介

[[toc]]

## 何为Webpack
Webpack是一个开源的Js模块打包工具，核心功能是解决模块间的依赖，把各个模块按照特定的规则和顺序组织到一起，最终合成一个或多个Js文件。

## 为什么要使用Webpack
1. ES6目前无法使用code splitting和tree shaking。
2. npm模块是CommonJS，浏览器不支持。
3. 浏览器平台兼容问题。
4. 使用webpack，多个模块间的作用域是隔离的，不会有命名冲突。

## 安装
`npm install webpack webpack-cli --save-dev`

webpack是核心模块。webpack-cli是命令行工具。

`npm i webpack-dev-server --save-dev`
webpack-dev-server 作用是启动一个本地服务，监听文件变化，自动刷新页面提高效率。因为生产环境中不需要，所以使用--save-dev放在devDependencies中。可以使用`npm i --production`过滤掉devDependencies中的模块。
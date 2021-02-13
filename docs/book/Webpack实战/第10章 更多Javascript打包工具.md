# 第10章 更多Javascript打包工具

[[toc]]

## Rollup
webpack优势在于更全面，“一切皆模块”的思想衍生出丰富的loader和plugin。Rollup更像一把手术刀，它更专注于js的打包。虽然也支持其他类型的模块，但总体上还是不如webpack。如果需求只是打包js，比如一个js库，Rollup有时候是第一选择。

### 配置
```js
// rollup.config.js
module.exports = {
    input: 'src/app.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    }
}

// src/app.js
console.log("xxx")
```
```js
npm i rollup -g

rollup -c rollup.config.js
```
打包结果如下：
```js
'use strict'; // 可以通过output.strict去掉
console.log("xxx")
```
可以看到打包出来的东西很干净，Rollup并没添加什么额外的代码。webpack会将自身代码注入进去。

### tree shaking
tree shaking这个特性最开始是有Rollup实现的，而后被webpack借鉴。

Rollup的tree shaking也是基于ES6 Modules的静态分析，找出没有被引用过的模块，将其从最后生成的bundle中排除。

### 可选的输出格式
Rollup有一项webpack不具备的特性，通过配置output.format开发者可以选择输出资源的模块形式。cjs(CommonJS)、amd、esm、iife、umd和system。这对于打包js库特别有用。

## Parcel
Parcel相对于webpack是后来者。在Parcel官网测试中，在有缓存的情况下其打包速度要比webpack快将近8倍，且宣称是零配置的。

### 打包速度
Parcel在打包速度的优化上主要做了3件事：     
1. 利用worker来并行执行任务。
2. 文件系统缓存。
3. 资源编译处理流程优化。

webpack在资源压缩时可以利用多核同时压缩多个资源。本地缓存更多是在loader的层面。

webpack主要靠loader来处理各种不同类型的资源。loader本质上就是一个函数，一般情况下它的输入和输出都是字符串。babel-loader工作流程分为：

- 将ES6形式的字符串内容解析为AST
- 对AST进行语法转换
- 生成ES5代码，并作为字符串返回

如果是多个loader依次对资源进行处理：
![loader](/images/Webpack实战/loader.jpg)

不同loader不需要知道彼此的存在。虽然产出一些冗余步骤，但是这有助于保持loader的独立性和可维护性。

Parcel的资源处理流程：
![Parcel](/images/Webpack实战/Parcel.jpg)

### 零配置
```js
parcel index.html // 启用开发者模式
parcel build index.html // 打包
```
虽然Parcel并没有属于自己的配置文件，但本质上它是把配置进行了切分，交给Babel、PostCSS等一些特定工具进行分别管理。比如当项目中有.babelrc时，那么Parcel打包时就会采用它作为ES6代码解析的配置。

## 打包工具的发展趋势
### 性能与通用性
进行技术选型时要看当前项目的需求，在通用性和性能之间做一些权衡。

### WebAssembly
WebAssembly主要特性是性能可以媲美于原生，像C和java等语言都可以编译为WebAssembly在现代浏览器上运行。

目前webpack、Rollup还是Parcel，都能找到对WebAssembly的支持。
```js
import {add} from './util.wasm';
add(2, 3);
```
假如loader及同类的编译工具足够强大，你可以引用一段C代码，然后让它运行在浏览器环境中。
# js v8模式

[[toc]]

## 单行输入
```js
var line = readline();
var result = line.split(' '); //获取第一行的内容，存为数组
console.log(result);
```
## 固定行数的多行输入
```js
var line_1 = readline();
var line_2 = readline();
var result_1= line_1.split(' '); //获取第一行的内容，存为数组
var result_2= line_2.split(' '); //获取第二行的内容，存为数组
print(result_1, result_2);
```
## 任意的多行输入
```js
while(line = readline()){
  var lines = line.split(' ')
  print(lines)
}
```

# js node模式
## 单行输入
```js
const readline = require('readline');
const rl = readline.createInterface({
　　input: process.stdin,
　　output: process.stdout
});

//单行输入
rl.on('line',function(data){
　　var result= data.split(' '); //获取第一行的内容，存为数组
　　console.log(result);
})
```

## 固定行数的多行输入
```js
var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 
//固定行数的多行输入 
const lines = [];
var num=3; //设定输入行数
var rows=[]; //用于存储每行的输入
 
rl.on('line',function(data){
    rows.push(data); //将每次输入的行数据存入
    if(num === rows.length){ //输入的行数等于num值
        console.log(rows); //输出结果
        // 处理完一组数据后需要清空 inputs，使其容纳下一组数据
        rows = [];
    }
});
```
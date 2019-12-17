## for in与for of区别

```js
//for..in.. :
for(var i in {a:1,b:2}){console.log(i)}//a,b
for(var i in [1,2]){console.log(i)}//0,1

//在vue中v-for和for..in..不一样
<div v-for="(item, index) in items"></div>
<div v-for="(val, key) in object"></div>
<div v-for="(val, name, index) in object"></div>

//for..of..  es6
for(var i of {a:1,b:2}){console.log(i)}//VM156:1 Uncaught TypeError: {(intermediate value)(intermediate value)} is not iterable
for(var i of [1,2]){console.log(i)}//1,2
```

for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。

for in会遍历数组所有的可枚举属性，包括原型。而且可能不会按照顺序输出。遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

for..of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象,因为没有迭代器对象.与forEach()不同的是，它可以正确响应break、continue和return语句。for of遍历的只是数组内的元素，而不包括数组的原型属性。
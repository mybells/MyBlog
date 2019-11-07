- [1.Array.from()](#1arrayfrom)
- [2.Array.isArray()](#2arrayisarray)
- [3.Array.of()](#3arrayof)
- [4.Array.prototype.concat()](#4arrayprototypeconcat)
- [5.Array.prototype.copyWithin()](#5arrayprototypecopywithin)
- [6.Array.prototype.entries()](#6arrayprototypeentries)
- [7.Array.prototype.every()](#7arrayprototypeevery)
- [8.Array.prototype.fill()](#8arrayprototypefill)
- [9.Array.prototype.filter()](#9arrayprototypefilter)
- [10.Array.prototype.find()](#10arrayprototypefind)
- [11.Array.prototype.findIndex()](#11arrayprototypefindindex)
- [12.Array.prototype.flat()](#12arrayprototypeflat)
- [13.Array.prototype.flatMap()](#13arrayprototypeflatmap)
- [14.Array.prototype.forEach()](#14arrayprototypeforeach)
- [15.Array.prototype.includes()](#15arrayprototypeincludes)
- [16.Array.prototype.indexOf()](#16arrayprototypeindexof)
- [17.Array.prototype.join()](#17arrayprototypejoin)
- [18.Array.prototype.keys()](#18arrayprototypekeys)
- [19.Array.prototype.lastIndexOf()](#19arrayprototypelastindexof)
- [20.Array.prototype.map()](#20arrayprototypemap)
- [21.Array.prototype.pop()](#21arrayprototypepop)
- [22.Array.prototype.push()](#22arrayprototypepush)
- [23.Array.prototype.reduce()](#23arrayprototypereduce)
- [24.Array.prototype.reduceRight()](#24arrayprototypereduceright)
- [25.Array.prototype.reverse()](#25arrayprototypereverse)
- [26.Array.prototype.shift()](#26arrayprototypeshift)
- [27.Array.prototype.slice()](#27arrayprototypeslice)
- [28.Array.prototype.some()](#28arrayprototypesome)
- [29.Array.prototype.sort()](#29arrayprototypesort)
- [30.Array.prototype.splice()](#30arrayprototypesplice)
### 1.Array.from()
Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

**语法**

```js
Array.from(arrayLike[, mapFn[, thisArg]])
```
from() 的 length 属性为 1 ，即 Array.from.length === 1。

**参数**

**arrayLike**

想要转换成数组的伪数组对象或可迭代对象。

 - 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
 - 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）

**mapFn** 可选

如果指定了该参数，新数组中的每个元素会执行该回调函数。
 Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg)
**thisArg** 可选

可选参数，执行回调函数 mapFn 时 this 对象。

**返回值**

一个新的数组实例。

**例子**

```js
Array.from('foo');
// [ "f", "o", "o" ]

const set = new Set(['foo', 'bar', 'baz', 'foo'])
Array.from(set);
// [ "foo", "bar", "baz" ]

const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [ 1, 2, 3 ]

Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]

Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```


### 2.Array.isArray()
用于确定传递的值是否是一个 Array。如果值是 Array，则为true; 否则为false。

**语法**

```javascript
Array.isArray(obj)
```
**例子**

```javascript
// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
```
**polyfill**

```javascript
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

### 3.Array.of()
Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

**语法**
```javascript
Array.of(element0[, element1[, ...[, elementN]]])
```

**例子**
```javascript
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(undefined); // [undefined]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```
**polyfill**

```javascript
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```
### 4.Array.prototype.concat()
concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。一个它所调用的已存在的数组的浅拷贝。

**例子**
```javascript
var alpha = ['a', 'b', 'c'];
var alphaNumeric = alpha.concat(1, [2, 3]);
console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]
console.log(alpha ); //['a', 'b', 'c'];
```
### 5.Array.prototype.copyWithin()
copyWithin() 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

**语法**

```javascript
arr.copyWithin(target[, start[, end]])//start省略从0开始，end省略会一直复制至数组结尾（默认为 arr.length）。
```
**例子**
```javascript
let numbers = [1, 2, 3, 4, 5];

numbers.copyWithin(-2);//start是0，end为5，target是-2，所以将4,5替换为1,2
// [1, 2, 3, 1, 2]

numbers.copyWithin(0, 3);//下标为3开始，将4,5复制到target为0开始的位置。
// [4, 5, 3, 4, 5]

numbers.copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

numbers.copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}
```
### 6.Array.prototype.entries()
entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。

**语法**

```javascript
arr.entries()
```
**例子**

```javascript
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator.next());//{value: [0,'a'], done: false}
console.log(iterator.next());//{value: [1,'b'], done: false}
console.log(iterator.next());//{value: [2,'c'], done: false}
console.log(iterator.next());//{value: undefined, done: true}
/*{value: Array(2), done: false}
  __proto__: Object
*/
// iterator.next()返回一个对象，对于有元素的数组，
// 是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
// 直到迭代器结束done才是true。
// next.value是一个["key","value"]的数组，是返回的迭代器中的元素值。


var arr = ["a", "b", "c"];
var iterator = arr.entries();
/*__proto__: Array Iterator
next: ƒ next()
Symbol(Symbol.iterator): ƒ ()
Symbol(Symbol.toStringTag): "Array Iterator"
__proto__: Object*/
for (let e of iterator) {
    console.log(e);
}
// [0, "a"]
// [1, "b"]
// [2, "c"]
```
### 7.Array.prototype.every()
every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
注意：若收到一个空数组，此方法在一切情况下都会返回 true。

**语法**

```javascript
//参数
//callback 在被调用时可传入三个参数：元素值，元素的索引，原数组。
//thisArg,执行 callback 时使用的 this 值。
arr.every(callback(element,index,array)[, thisArg])
```
every 遍历的元素范围在第一次调用 callback 之前就已确定了。在调用 every 之后添加到数组中的元素不会被 callback 访问到。如果数组中存在的元素被更改，则他们传入 callback 的值是 every 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。

**例子**
```javascript
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
```
### 8.Array.prototype.fill()
fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。返回修改后的数组。

**语法**

```javascript
arr.fill(value[, start[, end]])
```

**参数**

**value**

用来填充数组元素的值。

**start** 可选

起始索引，默认值为0。

**end** 可选

终止索引，默认值为 this.length。

**例子**

```javascript
[1, 2, 3, 4].fill(0, 2, 4)       // [1, 2, 0, 0]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}

// Objects by reference.
var arr = Array(3).fill({}) // [{}, {}, {}];
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```
### 9.Array.prototype.filter()
filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 返回一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

**语法**

```javascript
//参数
//callback 在被调用时可传入三个参数：元素值，元素的索引，原数组。
//thisArg,执行 callback 时使用的 this 值。
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```
filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。在调用 filter 之后被添加到数组中的元素不会被 filter 遍历到。如果已经存在的元素被改变了，则他们传入 callback 的值是 filter 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

**例子**
```javascript
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44]
```
### 10.Array.prototype.find()
 find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

 **语法**

```javascript
arr.find(callback(element,index,array)[, thisArg])
```
在第一次调用 callback函数时会确定元素的索引范围，因此在 find方法开始执行之后添加到数组的新元素将不会被 callback函数访问到。如果数组中一个尚未被callback函数访问到的元素的值被callback函数所改变，那么当callback函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍旧会被访问到，但是其值已经是undefined了。

**例子**

```javascript
var array1 = [5, 12, 8, 130, 44];
var found = array1.find(function(element) {
  return element > 10;
});
console.log(found);
// expected output: 12

var a = [0,1,,,,5,6];
// Shows all indexes, not just those that have been assigned values
a.find(function(value, index) {
  console.log('Visited index ' + index + ' with value ' + value);
});
VM88:5 Visited index 0 with value 0
VM88:5 Visited index 1 with value 1
VM88:5 Visited index 2 with value undefined
VM88:5 Visited index 3 with value undefined
VM88:5 Visited index 4 with value undefined
VM88:5 Visited index 5 with value 5
VM88:5 Visited index 6 with value 6

a.map(x=>{console.log(x)})//0 1 5 6
a.forEach(x=>{console.log(x)})//0 1 5 6
for(var i in a){console.log(a[i])}//0 1 5 6
for(var i=0;i<a.length;i++){console.log(a[i])}//0 1 undefined undefined undefined 5 6

a.find(function(value, index) {
  // Delete element 5 on first iteration
  if (index == 0) {
    console.log('Deleting a[5] with value ' + a[5]);
    delete a[5];  // 注：这里只是将a[5]设置为undefined，可以试试用a.pop()删除最后一项，依然会遍历到被删的那一项
  }
  // Element 5 is still visited even though deleted
  console.log('Visited index ' + index + ' with value ' + value);
});
VM439:6 Deleting a[5] with value 5
VM439:10 Visited index 0 with value 0
VM439:10 Visited index 1 with value 1
VM439:10 Visited index 2 with value undefined
VM439:10 Visited index 3 with value undefined
VM439:10 Visited index 4 with value undefined
VM439:10 Visited index 5 with value undefined
VM439:10 Visited index 6 with value 6
```
### 11.Array.prototype.findIndex()
findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。用法和find一样。
### 12.Array.prototype.flat()
flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

**语法**

```javascript
var newArray = arr.flat([depth])//depth 可选 指定要提取嵌套数组的结构深度，默认值为 1。
```
**例子**

flat() 方法会移除数组中的空项:
```javascript
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

```javascript
var arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
**Polyfill**

```javascript
// 使用 reduce、concat 和递归无限反嵌套多层嵌套的数组
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];

function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
flattenDeep(arr1);
// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```
### 13.Array.prototype.flatMap()
flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。 返回一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。

**语法**

```javascript
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```
**例子**

```javascript
var arr1 = [1, 2, 3, 4];
arr1.map(x => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// 只会将 flatMap 中的函数返回的数组 “压平” 一层
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]

let arr = ["今天天气不错", "", "早上好"]
arr.map(s => s.split(""))
// [["今", "天", "天", "气", "不", "错"],[],["早", "上", "好"]]

arr.flatMap(s => s.split(''));
// ["今", "天", "天", "气", "不", "错", "早", "上", "好"]
```
flatMap 能用于在map期间增删项目（也就是修改items的数量）。换句话说，它允许你遍历很多项使之成为另一些项（靠分别把它们放进去来处理），而不是总是一对一。

```javascript
let a = [5, 4, -3, 20, 17, -33, -4, 18]
//       |\  \  x   |  | \   x   x   |
//      [4,1, 4,   20, 16, 1,       18]

a.flatMap( (n) =>
  (n < 0) ?      [] :
  (n % 2 == 0) ? [n] :
                 [n-1, 1]
)
// expected output: [4, 1, 4, 20, 16, 1, 18]
```
**Polyfill**

```javascript
var arr = [1, 2, 3, 4];

arr.flatMap(x => [x, x * 2]);
// is equivalent to
arr.reduce((acc, x) => acc.concat([x, x * 2]), []);
// [1, 2, 2, 4, 3, 6, 4, 8]
```
### 14.Array.prototype.forEach()
forEach() 方法对数组的每个元素执行一次提供的函数。返回值为undefined.不可链式调用。forEach 方法按升序为数组中含有效值的每一项执行一次callback 函数，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。forEach 遍历的范围在第一次调用 callback 前就会确定。**注意： 没有办法中止或者跳出 forEach() 循环（break），除了抛出一个异常。如果你需要这样，使用 forEach() 方法是错误的。**

**语法**

```javascript
arr.forEach(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg]);
```
**例子**

```javascript
const arraySparse = [1,3,,7];
arraySparse.forEach(function(element){
  console.log(element);
});//执行了3次，  1 3 7
```
如果 thisArg 参数有值，则每次 callback 函数被调用的时候，this 都会指向 thisArg 参数上的这个对象。如果省略了 thisArg 参数,或者赋值为 null 或 undefined，则 this 指向全局对象。

```javascript
function Counter() {
    this.sum = 0;
    this.count = 0;
}

Counter.prototype.add = function(array) {
    array.forEach(function(entry) {
        this.sum += entry;
        ++this.count;
    }, this);
    //console.log(this);
};

var obj = new Counter();
obj.add([1, 3, 5, 7]);

obj.count;
// 4 === (1+1+1+1) 如果没有this，则为0
obj.sum;
// 16 === (1+3+5+7)




function Counter() {
    this.sum = 0;
    this.count = 0;
}
Counter.prototype.add = function(array) {
  console.log(this)
  let a=[1,2],b=[3,4],c=[5,6]
  a.forEach(function(x){console.log(x,this)})
  b.forEach(function(x){console.log(x,this)},this)
  c.map(function(x){console.log(x,this)})
};
var y=new Counter()
y.add()

Counter {sum: 0, count: 0}
1 Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
2 Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
3 Counter {sum: 0, count: 0}
4 Counter {sum: 0, count: 0}
5 Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
6 Window {parent: Window, postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, …}
```
下面的例子会输出"one", "two", "four"。当到达包含值"two"的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "four"现在在数组更前的位置，"three"会被跳过。 forEach()不会在迭代之前创建数组的副本。
```javascript
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
// one
// two
// four
```
### 15.Array.prototype.includes()
includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。注意：对象数组不能使用includes方法来检测。使用 includes()比较字符串和字符时是区分大小写。

**语法**

```javascript
arr.includes(valueToFind[, fromIndex])
```
**参数**

**valueToFind**

需要查找的元素值

**fromIndex** 可选

从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

**示例**

如果 fromIndex 大于等于数组的长度，则会返回 false，且该数组**不会被搜索**。
```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true

(function() {
  console.log([].includes.call(arguments, 'a')); // true
  console.log([].includes.call(arguments, 'd')); // false
})('a','b','c');
```
### 16.Array.prototype.indexOf()
indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。indexOf 使用strict equality (无论是 ===, 还是 triple-equals操作符都基于同样的方法)进行判断 searchElement与数组中包含的元素之间的关系。

**语法**

```javascript
arr.indexOf(searchElement[, fromIndex])
```
**示例**

```javascript
var array = [2, 5, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
array.indexOf(2, -1); // -1
array.indexOf(2, -3); // 0
```

### 17.Array.prototype.join()
join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

**语法**

```javascript
//separator 指定一个字符串来分隔数组的每个元素。如果缺省该值，数组元素用逗号（,）分隔。
arr.join([separator])
```
**返回值**

一个所有数组元素连接的字符串。如果 arr.length 为0，则返回空字符串。

**示例**

```javascript
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"


//如果一个元素为 undefined 或 null，它会被转换为空字符串。
var b = [undefined, 'Rain', null];
var myVar1 = b.join();//",Rain,"
var myVar2 = b.join('');//"Rain"


function f(a, b, c) {
  var s = Array.prototype.join.call(arguments);
  console.log(s); // '1,a,true'
}
f(1, 'a', true);
```

### 18.Array.prototype.keys()
 keys() 方法返回一个包含数组中每个索引键的Array Iterator对象。和Object.keys不一样。

 **语法**

```javascript
arr.keys()
```
**示例**

```javascript
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]

var arr1 = [null, ,undefined];
var t=arr1.keys()//Array Iterator {}
t.next()//{value: 0, done: false}
t.next()//{value: 1, done: false}
t.next()//{value: 2, done: false}
t.next()//{value: undefined, done: true}
```
### 19.Array.prototype.lastIndexOf()
lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。用法和indexOf一样。
### 20.Array.prototype.map()
map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。没有返回值的话，返回undefined。

**语法**

```javascript
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array
}[, thisArg])
```
map 方法会给原数组中的每个元素都按顺序调用一次  callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。

map 方法处理数组元素的范围是在 callback 方法第一次调用之前就已经确定了。调用map方法之后追加的数组元素不会被callback访问。如果存在的数组元素改变了，那么传给callback的值是map访问该元素时的值。在map函数调用后但在访问该元素前，该元素被删除的话，则无法被访问到。

**示例**

```javascript
var map = Array.prototype.map
var a = map.call("Hello World", function(x) {
  return x.charCodeAt(0);
})
// a的值为[72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]


var elems = document.querySelectorAll('select option:checked');
var values = Array.prototype.map.call(elems, function(obj) {
  return obj.value;
});


["1", "2", "3"].map(parseInt);
// parseInt(string, radix) -> map(parseInt(value, index))
/*  first iteration (index is 0): */ parseInt("1", 0); // 1
/* second iteration (index is 1): */ parseInt("2", 1); // NaN
/*  third iteration (index is 2): */ parseInt("3", 2); // NaN


var numbers = [1, 2, 3, 4];
var filteredNumbers = numbers.map(function(num, index) {
  if(index < 3) {
     return num;
  }
});
//index goes from 0,so the filterNumbers are 1,2,3 and undefined.
// filteredNumbers is [1, 2, 3, undefined]
```

### 21.Array.prototype.pop()
pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。从数组中删除的元素(当数组为空时返回undefined)。

pop 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。pop方法根据 length属性来确定最后一个元素的位置。如果不包含length属性或length属性不能被转成一个数值，会将length置为0，并返回undefined。

**语法**

```javascript
arr.pop()
```
**示例**

```javascript
let myFish = ["angel", "clown", "mandarin", "surgeon"];

let popped = myFish.pop();

console.log(myFish);
// ["angel", "clown", "mandarin"]

console.log(popped);
// surgeon
```
### 22.Array.prototype.push()
push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

**语法**

```javascript
arr.push(element1, ..., elementN)
```
push 方法有意具有通用性。该方法和 call() 或 apply() 一起使用时，可应用在类似数组的对象上。push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。

**示例**

```javascript
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");

console.log(sports);
// ["soccer", "baseball", "football", "swimming"]

console.log(total);
// 4


var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];
// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);
console.log(vegetables);
// ['parsnip', 'potato', 'celery', 'beetroot']


var obj = {
    length: 0,
    addElem: function addElem (elem) {
        // obj.length is automatically incremented
        // every time an element is added.
        [].push.call(this, elem);
    }
};

// Let's add some empty objects just to illustrate.
obj.addElem({});
obj.addElem({});
console.log(obj.length);
// → 2
```

### 23.Array.prototype.reduce()
reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
reduce为数组中的每一个元素依次执行callback函数，不包括数组中被删除或从未被赋值的元素

**语法**

```javascript
//accumulator 累计器
//currentValue 当前值
//currentIndex 当前索引
//array 数组
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```
**参数**

callback
执行数组中每个值 (如果没有提供 initialValue则第一个值除外)的函数，包含四个参数：

**accumulator**

累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）。

**currentValue**

数组中正在处理的元素。

**index** 可选

数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则从索引1起始。
**array**可选

调用reduce()的数组

**initialValue**可选

作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。


**回调函数第一次执行时，accumulator 和currentValue的取值有两种情况：如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。**

如果数组为空且没有提供initialValue，会抛出TypeError 。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue， 或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行。

**示例**

提供初始值通常更安全，正如下面的例子，如果没有提供initialValue，则可能有三种输出：
```javascript
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() 没有初始值
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError
```
累加对象数组里的值
```javascript
var sum = [{x: 1}, {x:2}, {x:3}].reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.x;
},0)

console.log(sum) // logs 6
```
将二维数组转化为一维

```javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(a, b) {
    return a.concat(b);
  },
  []
);
// flattened is [0, 1, 2, 3, 4, 5]
```
按属性对object分类

```javascript
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, 'age');
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
```
数组去重

```javascript
var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
var myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
  if (accumulator.indexOf(currentValue) === -1) {
    accumulator.push(currentValue);
  }
  return accumulator
}, [])

console.log(myOrderedArray);
```

### 24.Array.prototype.reduceRight()
reduceRight() 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。用法和reduce一样。

**语法**

```javascript
arr.reduceRight(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```
首次调用回调函数时，accumulator 和 currentValue 可以是两个值之一。如果调用 reduceRight 时提供了 initialValue 参数，则 accumulator等于 initialValue，currentValue 等于数组中的最后一个值。如果没有提供 initialValue 参数，则 accumulator 等于数组最后一个值， currentValue 等于数组中倒数第二个值。

如果数组为空，且没有提供 initialValue 参数，将会抛出一个 TypeError 错误。如果数组只有一个元素且没有提供 initialValue 参数，或者提供了 initialValue 参数，但是数组为空将会直接返回数组中的那一个元素或 initialValue 参数，而不会调用 callback。

**示例**

```javascript
reduce 与 reduceRight 之间的区别
var a = ['1', '2', '3', '4', '5'];
var left  = a.reduce(function(prev, cur)      { return prev + cur; });
var right = a.reduceRight(function(prev, cur) { return prev + cur; });

console.log(left);  // "12345"
console.log(right); // "54321"
```
### 25.Array.prototype.reverse()
reverse() 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。reverse 方法颠倒数组中元素的位置，改变了数组，并返回该数组的引用。

reverse方法是特意类化的；此方法可被 called 或 applied于类似数组对象。对象如果不包含反映一系列连续的、基于零的数值属性中的最后一个长度的属性，则该对象可能不会以任何有意义的方式运行。

**语法**

```javascript
 arr.reverse()
```
**示例**

```javascript
var array1 = ['one', 'two', 'three'];
var reversed = array1.reverse();
console.log('reversed: ', reversed);
// expected output: Array ['three', 'two', 'one']
console.log('array1: ', array1);
// expected output: Array ['three', 'two', 'one']


const a = {0: 1, 1: 2, 2: 3, length: 3};
Array.prototype.reverse.call(a); //same syntax for using apply()
console.log(a); // {0: 3, 1: 2, 2: 1, length: 3}
```

### 26.Array.prototype.shift()
shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。如果数组为空则返回undefined 。

**语法**

```javascript
arr.shift()
```
shift 方法并不局限于数组：这个方法能够通过 call 或 apply 方法作用于类似数组的对象上。但是对于没有 length 属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

**示例**

```javascript
var names = ["Andrew", "Edward", "Paul", "Chris" ,"John"];

while( (i = names.shift()) !== undefined ) {
    console.log(i);
}
// Andrew, Edward, Paul, Chris, John
```

### 27.Array.prototype.slice()
slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

**语法**

```javascript
//如果省略 begin，则 slice 从索引 0 开始。如果 begin 大于原数组的长度，则会返回空数组。
//如果 end 被省略，则 slice 会一直提取到原数组末尾。如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。
arr.slice([begin[, end]])
```
slice 不会修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

 - 如果该元素是个对象引用 （不是实际的对象），slice会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。
 - 对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

如果向两个数组任一中添加了新元素，则另一个不会受到影响。

**示例**

```javascript
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);
// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']


function list() {
  return Array.prototype.slice.call(arguments);
  //[].slice.call(arguments);
}
var list1 = list(1, 2, 3); // [1, 2, 3]


var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.call.bind(unboundSlice);
function list() {
  return slice(arguments);
}
var list1 = list(1, 2, 3); // [1, 2, 3]
```
### 28.Array.prototype.some()
some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。空数组返回的都是false。
数组中有至少一个元素通过回调函数的测试就会返回true；所有元素都没有通过回调函数的测试返回值才会为false。

**语法**

```javascript
arr.some(callback(element[, index[, array]])[, thisArg])
```
callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
some() 遍历的元素的范围在第一次调用 callback. 前就已经确定了。在调用 some() 后被添加到数组中的值不会被 callback 访问到。如果数组中存在且还未被访问到的元素被 callback 改变了，则其传递给 callback 的值是 some() 访问到它那一刻的值。已经被删除的元素不会被访问到。

```javascript
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

### 29.Array.prototype.sort()
sort() 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

**语法**

```javascript
//firstEl第一个用于比较的元素。
//secondEl第二个用于比较的元素。
//如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
arr.sort([compareFunction(firstEl,secondEl)])
```

返回排序后的数组。请注意，数组已原地排序，并且不进行复制。

如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。
如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。

```javascript
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```
**示例**

```javascript
var numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers);
// [1, 2, 3, 4, 5]


var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];
// sort by value从小到大排序
items.sort(function (a, b) {
  return (a.value - b.value)
});
```
当排序非 ASCII 字符的字符串（如包含类似 e, é, è, a, ä 等字符的字符串）。一些非英语语言的字符串需要使用 String.localeCompare。这个函数可以将函数排序到正确的顺序。

```javascript
var items = ['réservé', 'premier', 'cliché', 'communiqué', 'café', 'adieu'];
items.sort(function (a, b) {
  return a.localeCompare(b);
});
```

### 30.Array.prototype.splice()
splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。如果没有删除元素，则返回空数组。

**语法**

```javascript
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```
**参数**

**start​**

指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。没有参数则返回空数组。

**deleteCount** 可选

整数，表示要移除的数组元素的个数。
如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
如果 deleteCount 被省略了，那么start之后数组的所有元素都会被删除。
如果 deleteCount 是 0 或者负数，则不移除元素。

**item1, item2, ...** 可选

要添加进数组的元素,从start 位置开始。如果不指定，则 splice() 将只删除数组元素。

**示例**

```javascript
var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
var removed = myFish.splice(2, 1, "trumpet");
// 运算后的 myFish: ["angel", "clown", "trumpet", "sturgeon"]
// 被删除的元素: ["drum"]


var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);
// 运算后的 myFish: ["angel", "clown"]
// 被删除的元素: ["mandarin", "sturgeon"]

var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice();
console.log(myFish)//["angel", "clown", "mandarin", "sturgeon"]
console.log(removed)//[]
```

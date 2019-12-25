## 2 ECMAScript 和 TypeScript 概述

## export 与 import

```js
const a = function() {}
const b = function() {}

export { a, b }
import { a as a1, b as b1 } from "xx"

export { a as a1, b as b1 }
import { a1, b1 } from "xx"
import * as c from "xx"
```

node.js 目前不支持 import 语法，需要使用 require 关键字。

## TypeScript

它的主要功能之一是为 js 变量提供类型支持。最后，它会被编译为简单的 js 代码。

1. 类型推断

```typescript
let age: number = 20
```

typescript 有一个类型推断机制，就是说它会根据为变量赋的值自动给该变量设置一个类型。

2. 接口
   用法一：把接口看作一个实际的东西。它是一个对象必须包含的属性和方法的描述

```typescript
interface Person {
  name: string
  age: number
}
function printName(person: Person) {
  console.log(person.name)
}
```

用法二：Comparable 接口告诉 MyObject 类，它需要实现一个叫做 compareTo 的方法，并且该方法接收一个参数。

```typescript
interface Comparable {
  compareTo(b): number
}

class MyObject implements Comparable {
  age: number
  compareTo(b): number {
    if (this.age === b.age) {
      return 0
    }
  }
}
```

3. 泛型
   定义 compareTo 方法作为参数接收的对象是什么类型。

```typescript
interface Comparable<T> {
  compareTo(b: T): number
}

class MyObject implements Comparable<MyObject> {
  age: number
  compareTo(b: MyObject): number {
    if (this.age === b.age) {
      return 0
    }
  }
}
```

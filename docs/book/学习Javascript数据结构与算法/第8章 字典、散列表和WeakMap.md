# 第8章 字典、散列表和WeakMap

- [8.1 字典](#_8-1-字典)
- [8.2 散列表](#_8-2-散列表)
- [8.3 处理散列表中的冲突](#_8-3-处理散列表中的冲突)
  - [1.分离链接](#_1-分离链接)
  - [2.线性探查](#_2-线性探查)
- [8.4 WeakMap 和 WeakSet 类](#_8-4-weakmap-和-weakset-类)

## 8.1 字典
### 概念
字典和集合很相似，集合以[值,值]的形式存储元素，字典则是以[键,值]的形式来存储元素。字典也称作映射、符号表或关联数组。和 es6 中 Map 类一样。

### 字典实现
```js
class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}
class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }

  values() {
    return this.keyValues().map(valuePair => valuePair.value)
  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.key)
  }

  keyValues() {
    return Object.values(this.table)
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues()
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
      if (result === false) {
        break
      }
    }
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return Object.keys(this.table).length
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty()) {
      return ""
    }
    const valuePairs = this.keyValues()
    let objString = `${valuePairs[0].toString()}`
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`
    }
    return objString
  }
}
```

## 8.2 散列表
### 概念
散列算法的作用是尽可能快的在数据结构中找到一个值。散列函数的作用是给定一个键值，然后返回值在表中的地址。

### 散列表实现
```js
class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}: ${this.value}]`
  }
}

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }

  /* djb2HashCode(key) {
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  } */
  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  remove(key) {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    if (valuePair != null) {
      delete this.table[hash]
      return true
    }
    return false
  }

  getTable() {
    return this.table
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return Object.keys(this.table).length
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty()) {
      return ""
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }
}
```

## 8.3 处理散列表中的冲突
### 概念
有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称为冲突。处理冲突有几种方法：分离链接、线性探查和双散列法。

### 1.分离链接
为散列表的每一个位置创建一个链表并将元素存储在里面。

#### 分离链接实现
```js
class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      if (this.table[position] == null) {
        this.table[position] = new LinkedList()
      }
      this.table[position].push(new ValuePair(key, value))
      return true
    }
    return false
  }

  get(key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined
  }

  remove(key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element)
          if (linkedList.isEmpty()) {
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    let count = 0
    Object.values(this.table).forEach(linkedList => {
      count += linkedList.size()
    })
    return count
  }

  clear() {
    this.table = {}
  }

  getTable() {
    return this.table
  }

  toString() {
    if (this.isEmpty()) {
      return ""
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }
}
```

### 2.线性探查
当想向表中的某个位置添加一个新元素的时候，如果索引为 position 的位置被占据了，就尝试 position+1 的位置。以此类推，直到找到一个空闲的位置。

线性探查技术分为两种：1.软删除方法：我们用一个特殊的值（标记）来表示键值对被删除了，而不是真的删除它。经过一段时间，散列表被操作过后，我们会得到一个标记了若干删除位置的散列表。这会逐渐降低散列表的效率，因为搜索键值会随时间变得更慢。 2.第二种方法需要检验是否有必要将一个或多个元素移动到之前的位置。当搜索一个键值的时候，这种方法可以避免找到一个空位置。

#### 2.1 软删除方法实现
```js
class ValuePairLazy extends ValuePair {
  constructor(key, value, isDeleted = false) {
    super(key, value)
    this.key = key
    this.value = value
    this.isDeleted = isDeleted
  }
}
class HashTableLinearProbingLazy {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      if (this.table[position] == null || (this.table[position] != null && this.table[position].isDeleted)) {
        this.table[position] = new ValuePairLazy(key, value)
      } else {
        let index = position + 1
        while (this.table[index] != null && !this.table[position].isDeleted) {
          index++
        }
        this.table[index] = new ValuePairLazy(key, value)
      }
      return true
    }
    return false
  }

  get(key) {
    const position = this.hashCode(key)
    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        return this.table[position].value
      }
      let index = position + 1
      while (this.table[index] != null && (this.table[index].key !== key || this.table[index].isDeleted)) {
        if (this.table[index].key === key && this.table[index].isDeleted) {
          return undefined
        }
        index++
      }
      if (this.table[index] != null && this.table[index].key === key && !this.table[index].isDeleted) {
        return this.table[position].value
      }
    }
    return undefined
  }

  remove(key) {
    const position = this.hashCode(key)
    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        this.table[position].isDeleted = true
        return true
      }
      let index = position + 1
      while (this.table[index] != null && (this.table[index].key !== key || this.table[index].isDeleted)) {
        index++
      }
      if (this.table[index] != null && this.table[index].key === key && !this.table[index].isDeleted) {
        this.table[index].isDeleted = true
        return true
      }
    }
    return false
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    let count = 0
    Object.values(this.table).forEach(valuePair => {
      count += valuePair.isDeleted === true ? 0 : 1
    })
    return count
  }

  clear() {
    this.table = {}
  }

  getTable() {
    return this.table
  }

  toString() {
    if (this.isEmpty()) {
      return ""
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }
}
```

#### 2.2 移动元素方法实现
```js
class HashTableLinearProbing {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      if (this.table[position] == null) {
        this.table[position] = new ValuePair(key, value)
      } else {
        let index = position + 1
        while (this.table[index] != null) {
          index++
        }
        this.table[index] = new ValuePair(key, value)
      }
      return true
    }
    return false
  }

  get(key) {
    const position = this.hashCode(key)
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        return this.table[position].value
      }
      let index = position + 1
      while (this.table[index] != null && this.table[index].key !== key) {
        index++
      }
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[position].value
      }
    }
    return undefined
  }

  remove(key) {
    const position = this.hashCode(key)
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position]
        this.verifyRemoveSideEffect(key, position)
        return true
      }
      let index = position + 1
      while (this.table[index] != null && this.table[index].key !== key) {
        index++
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index]
        this.verifyRemoveSideEffect(key, index)
        return true
      }
    }
    return false
  }

  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key)
    let index = removedPosition + 1
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key)
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index]
        delete this.table[index]
        removedPosition = index
      }
      index++
    }
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return Object.keys(this.table).length
  }

  clear() {
    this.table = {}
  }

  getTable() {
    return this.table
  }

  toString() {
    if (this.isEmpty()) {
      return ""
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }
}
```

## 8.4 WeakMap 和 WeakSet 类
WeakSet 或 WeakMap 类没有 entries、keys、values 等方法。
只能用对象作为键。

创建和使用这两个类主要是为了性能。WeakSet 和 WeakMap 是弱化的（用对象作为键），没有强引用的键。这使得 js 的垃圾回收器可以从中清除整个入口。另一个优点是，必须用键才可以取出值。这样就可以有利于私有属性的封装。

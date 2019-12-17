## class与class继承

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script>
    class A{
      x='x'//相当于this.x='x'
      constructor(){
        console.log(this.x)//x
        this.a='a'
        this.name=(x,y)=>{
          this.d="d"
          console.log(x,y)
        }
        // x='a'//Uncaught ReferenceError: x is not defined
      }
      name1() {
        this.b='b'
        return this.d
      };
      static c='c'
    };

    console.log(new A())
    // a: "a"
    // name: (x,y)=> {…}
    // __proto__: 
    //   constructor: class A
    //   name1: ƒ name1()
    //   __proto__: Object

    console.log(A.prototype)
    // constructor: class A
    // name1: ƒ name1()
    // __proto__: Object

    console.log(A.__proto__)
    // ƒ () { [native code] }


    class B extends A{
      constructor(){
        super();
        this.x2="x2"
      }
      name3() {
        this.i2='i2'
      };
      static v2='v2'
      s2='s2'
    }

    console.log(new B())
    // a: "a"
    // name: (x,y)=> {…}
    // s2: "s2"
    // x2: "x2"
    // __proto__: A
    //   constructor: class B
    //   name3: ƒ name3()
    //   __proto__:
    //     constructor: class A
    //     name1: ƒ name1()
    //     __proto__: Object

    console.log(B.prototype)
    // constructor: class B
    // name3: ƒ name3()
    // __proto__:
    //   constructor: class A
    //   name1: ƒ name1()
    //   __proto__: Object

    console.log(B.__proto__)
    //class A{...}

    // 上面代码中,子类B的__proto__属性指向父类A,子类B的prototype属性的__proto__属性指向父类A的prototype属性
    // B.__proto__===A //true
    // B.prototype.__proto__===A.prototype //true
    // 这两条继承链可以这样理解：作为一个对象，子类B的原型（__proto__属性）是父类A;
    // 作为一个构造函数，子类B的原型（prototype属性）是父类的实例。
  </script>
</body>
</html>
```

for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。

for in会遍历数组所有的可枚举属性，包括原型。而且可能不会按照顺序输出。遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

for..of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象的集合.但是不能遍历对象,因为没有迭代器对象.与forEach()不同的是，它可以正确响应break、continue和return语句。for of遍历的只是数组内的元素，而不包括数组的原型属性。
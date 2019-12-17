## vueAPI总结

  - [**1. Vue.nextTick( [callback, context] )**](#_1-vue-nexttick-callback-context)
  - [**2. Vue.use( plugin )**](#_2-vue-use-plugin)
  - [**3. Vue.observable( object )**](#_3-vue-observable-object)
  - [**4. data**](#_4-data)
  - [**5. propsData**](#_5-propsdata)
  - [**6. watch**](#_6-watch)
  - [**7.provide / inject**](#_7-provide-inject)
  - [**8.name**](#_8name)
  - [**9.delimiters**](#_9delimiters)
  - [**10.model**](#_10model)
  - [**11. inheritAttrs**](#_11-inheritattrs)
  - [**12. vm.$attrs**](#_12-vm-attrs)
  - [**13. vm.$listeners**](#_14-vm-listeners)
  - [**14. vm.$forceUpdate()**](#_14-vm-forceupdate)
  - [**15. keep-alive**](#_15-keep-alive)
  
#### **1. Vue.nextTick( [callback, context] )**
```js
// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
 .then(function () {
   // DOM 更新了
 })
```
2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。请注意 Vue 不自带 Promise 的 polyfill，所以如果你的目标浏览器不原生支持 Promise (IE：你们都看我干嘛)，你得自己提供 polyfill。

#### **2. Vue.use( plugin )**
参数：
{Object | Function} plugin

用法：
安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

该方法需要在调用 new Vue() 之前被调用。

当 install 方法被同一个插件多次调用，插件将只会被安装一次。

#### **3. Vue.observable( object )**
**2.6.0 新增**

参数：
{Object} object

用法：
让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：

```js
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```
在 Vue 2.x 中，被传入的对象会直接被 Vue.observable 改变，所以如这里展示的，它和被返回的对象是同一个对象。在 Vue 3.x 中，则会返回一个可响应的代理，而对源对象直接进行修改仍然是不可响应的。因此，为了向前兼容，我们推荐始终操作使用 Vue.observable 返回的对象，而不是传入源对象。

#### **4. data**
以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些属性。所以this._aaa将拿不到data中_aaa的数据，只能this.\$data._aaa

#### **5. propsData**
类型：`{ [key: string]: any }`

限制：只用于 new 创建的实例中。

详细：
创建实例时传递 props。主要作用是方便测试。

示例：
```js
var Comp = Vue.extend({
  props: ['msg'],
  template: '<div>{{ msg }}</div>'
})

var vm = new Comp({
  propsData: {
    msg: 'hello'
  }
})
```
#### **6. watch**
类型：{ [key: string]: string | Function | Object | Array }

详细：
一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

数组不需要deep:true,直接监听这个数组就能获取数组改变。对象中的属性得加deep:true要不监听不到变化。

示例：
```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    },
    arr:[1]
  },
  watch: {
	arr(val, oldVal){
      //数组arr改变就会触发这个函数
	},
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // 方法名
    b: 'someMethod',//执行metheds中的someMethod方法，参数是val, oldVal
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true//不加这个监听不到
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true
    },
    e: [//按照先后顺序执行handle1,handle2,handle3
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
        /* ... */
      }
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```
#### **7.provide / inject**
2.2.0 新增
这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。在该对象中你可以使用 ES2015 Symbols 作为 key，但是只在原生支持 Symbol 和 Reflect.ownKeys 的环境下可工作。

inject 选项应该是：

一个字符串数组，或
一个对象，对象的 key 是本地的绑定名，value 是：
	在可用的注入内容中搜索用的 key (字符串或 Symbol)，或
	一个对象，该对象的：
		from 属性是在可用的注入内容中搜索用的 key (字符串或 Symbol)
		default 属性是降级情况下使用的 value
```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  //provide () {
   //return {
    // s: 'foo'
   // }
  //}
}

// 子组件注入 'foo'
var Child = {
  //inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  //如果它需要从一个不同名字的属性注入，则使用 from 来表示其源属性：
  inject: {
    xx: {
      from: 'foo',
      default: 'foo'
    }
  }
  // ...
}
```

> 提示：provide 和 inject
> 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。
> 
#### **8.name**
类型：string

限制：只有作为组件选项时起作用。

详细：
允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，全局 ID 自动作为组件的 name。

#### **9.delimiters**
类型：`Array<string>`
默认值：`["{{", "}}"]`
限制：这个选项只在完整构建版本中的浏览器内编译时可用。
详细：改变纯文本插入分隔符。
示例：
```js
new Vue({
  delimiters: ['${', '}']
})
// 分隔符变成了 ES6 模板字符串的风格
```
#### **10.model**
2.2.0 新增
类型：{ prop?: string, event?: string }
详细：
允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 **v-model 会把 value 用作 prop 且把 input 用作 event**，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

Example：

```js
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0
    }
  },
  // ...
})
<my-checkbox v-model="foo" value="some value"></my-checkbox>
//上述代码相当于：

<my-checkbox
  :checked="foo"
  @change="val => { foo = val }"
  value="some value">
</my-checkbox>
```
#### **11. inheritAttrs**
2.4.0 新增
类型：boolean
默认值：true
详细：
默认情况下父作用域的**不被认作 props 的特性绑定** (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。而通过 (同样是 2.4 新增的) 实例属性 $attrs 可以让这些特性生效，且可以通过 v-bind 显性的绑定到非根元素上。 (class 和 style 除外)

注意：这个选项不影响 class 和 style 绑定。

#### **12. vm.$attrs**

2.4.0 新增
类型：{ [key: string]: string }
只读
详细：
包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

#### **13. vm.$listeners**

2.4.0 新增
类型：`{ [key: string]: Function | Array<Function> }`
只读
详细：
包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
vue2.4中，引入了\$attrs 和$listeners ， 新增了inheritAttrs，使用方法：[https://blog.csdn.net/songxiugongwang/article/details/84001967](https://blog.csdn.net/songxiugongwang/article/details/84001967)

#### **14. vm.$forceUpdate()**
迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

#### [**15. keep-alive**](https://cn.vuejs.org/v2/api/#keep-alive)




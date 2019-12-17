## vuex总结

![在这里插入图片描述](https://imgconvert.csdnimg.cn/aHR0cHM6Ly92dWV4LnZ1ZWpzLm9yZy92dWV4LnBuZw?x-oss-process=image/format,png)


  - [1. 使用vuex](#_1-%e4%bd%bf%e7%94%a8vuex)
  - [2. State](#_2-state)
  - [3. Getters](#_3-getters)
  - [4. mutation](#_4-mutation)
  - [5. Action](#_5-action)
  - [6. Mutation与Action差异](#_6-mutation%e4%b8%8eaction%e5%b7%ae%e5%bc%82)
  - [7. Module](#_7-module)
  
#### **1. 使用vuex**
```js
//main.js
import store from './store.js';
new Vue({
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  ...App
}).$mount('#app')


//store.js
import Vue from 'Vue'
import Vuex from 'Vuex'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    count: '1'
  },
  getters: {
    getcount: (state,getters) => {
      return state.count
    }
  },
  mutations: {
    increment (state, payload) {
      state.count= payload;
    }
  },
  actions: {
    incrementAsync(context) {
      context.commit('increment ')
    }
  }
});


//组件中watch监听
watch: {
  '$store.state.key':function(newval,oldval){
    console.log(newval,oldval)
  }
},
```

#### **2. State**

```js
//store.js
state: {
  count: '1'
},


//使用
// 在单独构建的版本中辅助函数为 Vuex.mapState
// mapState 函数返回的是一个对象
import { mapState } from 'vuex'

export default {
  // ...
  methods:{
	s(){return this.$store.state.count;}
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
	// 映射 this.count 为 store.state.count
	'count'
	  
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
  
  computed: mapState(['count'])
  
  computed:{
  	  localComputed () { /* ... */ },
	  // 使用对象展开运算符将此对象混入到外部对象中
	  ...mapState({
	    count
	  })//等同于count(){return this.$store.state.count;}
  }
}
```
#### **3. Getters**
可以认为是 store 的计算属性。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```js
//store.js
getters: {
  getcount: (state,getters) => {
    return state.count
  }
}


//使用
import { mapState } from 'vuex'

export default {
  // ...
  methods:{
	s(){return this.$store.getters.getcount;}
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])

	mapGetters({
	  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
	  doneCount: 'doneTodosCount'
	})
  }
}
```
#### **4. mutation**
Mutation 必须是同步函数
```js
//store.js
mutations: {
  increment (state, n) {
    state.count += n
  },
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [SOME_MUTATION] (state) {
     // mutate state
  }
}

//使用
import { mapMutations } from 'vuex'
export default {
  // ...
  methods:{
	test(){
		this.$store.commit('increment', 10)
		this.$store.commit({
		  type: 'increment',
		  amount: 10
		})
	},
	...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}

```

#### **5. Action**
Action 类似于 mutation，不同在于：
 - Action 提交的是 mutation，而不是直接变更状态。
 -  Action 可以包含任意异步操作。
 
Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters
```js
//store.js
actions: {
  incrementAsync({ commit }) {//解构context
    commit('increment')
  }

  //执行actionB会先执行actionA，返回一个Promise,resolve成功后执行commit
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
  
  // 假设 getData() 和 getOtherData() 返回的是 Promise
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}

//使用
import { mapActions } from 'vuex'
export default {
  // ...
  methods:{
	test(){
		this.$store.dispatch('incrementAsync')
		// 以对象形式分发
		this.$store.dispatch({
		  type: 'incrementAsync',
		  amount: 10
		})
	},
	...mapActions([
      'incrementAsync', // 将 `this.incrementAsync()` 映射为 `this.$store.dispatch('incrementAsync')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'incrementAsync' // 将 `this.add()` 映射为 `this.$store.dispatch('incrementAsync')`
    })
  }
}
```
#### **6. Mutation与Action差异**
Muation与Action作用是相同的，官网上说Mutation 必须是同步函数，Action处理异步函数。我觉得这是因为在vue devtool调试工具状态管理中，如果Mutation是异步函数，mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用就会导致devtool中状态管理不可追踪，这个问题就会导致调试非常难。而在action中的异步函数中提交mutation是可以追踪状态的。
总的来说，**使用devtool调试，异步函数在muation中状态是不可追踪的，在action中状态是可以追踪的**。如果你不使用devtool两者其实就是一样的，只不过mutation函数第一个参数是state，action 函数接受一个与 store 实例具有相同方法和属性的 context 对象。
例子：
```js
//store.js
  state: {
    key: '1',
    count:0
  },
  mutations: {
    updateCount(state, payload) {
      setTimeout(() => {
        state.count += 1;
      }, 2000);
    },
    xupdateCount(state, payload) {
      setTimeout(() => {
        state.count += 1;
      }, 2000);
    }
  },
  actions: {
    asyncUpdateCount(context, payload) {
      setTimeout(() => {
        // context.state.count += 1;//这种是可以的，页面会响应。但是在vue devtool状态管理中监听不到变化，就会导致调试困难。
        context.commit('xupdateCount')
      }, 2000);
    }
  }

//组件中
	count:{{count}}
    <el-button type="primary" @click="setkey">mutation</el-button>
    <el-button type="primary" @click="setkey2">action</el-button>


	computed: {
      count(){
        return this.$store.state.count
      }
    },
    methods: {
      setkey(){
        this.$store.commit('updateCount')
      },
      setkey2(){
        this.$store.dispatch('asyncUpdateCount')
      }
    },
```
点击mutation，devtool中会立即记录状态，但这个状态并不是异步执行时的状态。效果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190901165522572.gif)
点击action按钮，devtool中会记录异步执行时的状态。效果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190901165711865.gif)
#### 7. Module
Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
```js
//moduleA
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
    }
  },
  getters: {//对于模块内部的 getter，根节点状态会作为第三个参数rootState暴露出来
    doubleCount (state, getters, rootState) {
    }
  }
}
```
**命名空间**

**默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的**——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 `getter、action 及 mutation` 都会自动根据模块注册的路径调整命名。启用了命名空间的 `getter 和 action` 会收到局部化的 `getter，dispatch 和 commit`。

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```
**在带命名空间的模块内访问全局内容（Global Assets）**

如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },

       someAction: {
         root: true,
         handler (namespacedContext, payload) { ... } // -> 'someAction'
       }
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```
module中的辅助函数

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })

  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])

  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```
**严格模式**

在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```


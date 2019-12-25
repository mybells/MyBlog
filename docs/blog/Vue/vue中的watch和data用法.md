## vue中的watch和data用法

```js
  export default {
    data() {
      return {
        _a:'a',
        arr:[1,2,3]
      }
    },
    watch: {
      // arr(val,oldval){
      //   //当arr数组新增或者改变时会触发
      // },
      // arr:'watchmethod',//执行methods中的watchmethod事件,传两个参数val,oldval
      arr:[//会按照数组下标顺序执行
        'watchmethod',//watchmethod
        function handler2(val, oldVal) {//再执行handler2
          debugger;
        },
        {//最后执行handler3
          handler: function handler3 (val, oldVal) { /* ... */ },
          /* ... */
        }
      ]
    },
    created() {
      debugger;
      let a=this._a//undefined
      let b=this.$data._a//a
      this.arr.push(4)
    },
    methods: {
      watchmethod(val,oldval){
        //数组改变时触发这个函数
      }
    }
  }
```
## vue自定义指令

```html
<template>
  <div class="all" v-has="'one'">
    <div class="test">
      <el-button type="primary" @click="btnck" v-has="'two'">点击</el-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    created() {

    },
    methods: {
      btnck(){
        console.log('click')
      }
    },
    directives: {
      has: {
        bind(el, binding, vnode) {
          el.addEventListener('mousedown', _mousedown, false);//默认false，冒泡
          function _mousedown(event){
            if(event.target===el){
              //这个是点击自身
            }
            console.log(binding.value)
            // setTimeout(() => {
            //   console.log(binding.value)
            // }, 2000);
            //addEventListener冒泡，点击按钮，先触发mousedown事件,由自身冒泡到外部,然后click事件。事件是同步执行的,内部函数这是异步的,返回值按照请求时间顺序返回
          }
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
.all
  width:1000px;
  height:600px;
  background:blue;
  .test
    width:500px;
    height:500px;
    background yellow
</style>
```
## vue中使用vuerouter遇到的问题

## 1.[Vue warn]: Unknown custom element: \<router-link>
vue项目中引入了vue-router报了如下第一个错误：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190910105123946.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3F3ZTQzNTU0MTkwOA==,size_16,color_FFFFFF,t_70)
第二个错误：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190910105453709.png)
代码如下：
```html
//App.vue
<router-link to="/">bar</router-link>
<router-link to="/foo">foo</router-link>
<router-link to="/bar">foo</router-link>
<router-view></router-view>
```

```js
//main.js入口文件
import Vue from 'Vue'
import App from './App.vue'
import store from './vuex/store.js';
import router from '@/router/router';

Vue.use(ElementUI);
Vue.use(mybells);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


//router.js路由文件
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
export default new Router({
  routes:[
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})
```
解决方法：
后来发现是由于import引入的vue包名字有问题，这里main.js中是`import Vue from 'Vue'`，router.js中是`import Vue from 'vue'`两个引入的vue首字母大小写不一致，导致了第一个`router-link`错误。后来我把vue都改为大写导致了第二个错误。都改成小写的就ok了。所以vue包的名字应该是小写的。



## 2.[Vue warn]: $listeners and $attrs is readonly
还有一个`Vue warn $listeners and $attrs is readonly`的问题，这个问题也是由于别的组件import也在访问Vue。在该文件的顶部是`import Vue from 'vue/dist/vue.esm'`或者`import Vue from 'Vue'`。其他每个文件都是`import Vue from 'vue'`，这是双重导入的来源，这种也导致了下面错误的发生,只需要把这些不一致的引入都改为`import Vue from 'vue'`就好了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190910104344544.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3F3ZTQzNTU0MTkwOA==,size_16,color_FFFFFF,t_70)
## 实现一个Promise/A+ 规范的Promise
## 1.代码实现

```javascript
// promise 三个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED ='rejected';
class Promisex {
  constructor(fn){
    if(typeof fn !== 'function') throw new Error('Promisex must accept a function')
    this.state = PENDING;//初始状态
    this.value = null;//返回的信息/拒绝的原因

    this.onFulfilledQueues = [];//存储fulfilled状态对应onFulfilled函数队列
    this.onRejectedQueues = [];//存储rejected状态对应onRejected函数队列

    // value成功态时接收的终值
    const resolve=(value) => {
      if(value instanceof Promisex){
        return value.then(resolve,reject);
      }else{
        //加setTimeout原因：
        //实践中要确保 onFulfilled 和 onRejected 方法异步执行，
        setTimeout(() => {
          if(this.state!==PENDING) return;
          this.state = FULFILLED;
          this.value = value;
          let cb;
          while (cb = this.onFulfilledQueues.shift()) {
            cb(value)
          }
        });
      }
    }

    // reason失败态时接收的拒因
    const reject=(reason)=>{
      setTimeout(() => {
        if(this.state!==PENDING) return;
        this.state = REJECTED;
        this.value = reason;
        let cb;
        while (cb = this.onRejectedQueues.shift()) {
          cb(reason)
        }
      });
    }

    //执行
    try {
      fn(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }

  //注册fulfilled状态/rejected状态对应的回调函数
  //then返回一个新的promise对象
  //then中需要处理三种状态
  then(onFulfilled, onRejected){
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

    let newPromise;
    if(this.state===FULFILLED){//成功状态
      return newPromise=new Promisex((resolve,reject)=>{
        setTimeout(() => {
          try {
            let x=onFulfilled(this.value);//onFulfilled有返回值
            resolvePromise(newPromise,x,resolve,reject);
          } catch (e) {
            reject(e)
          }
        });
      })
    }
    if(this.state===REJECTED){//失败状态
      return newPromise=new Promisex((resolve,reject)=>{
        setTimeout(() => {
          try {
            //不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected。
            let x=onRejected(this.value);//onRejected有返回值
            resolvePromise(newPromise,x,resolve,reject);
          } catch (e) {
            reject(e)
          }
        });
      })
    }
    if(this.state===PENDING){//等待状态
      //将onFulfilled/onRejected收集暂存到队列中
      return newPromise=new Promisex((resolve,reject)=>{
        this.onFulfilledQueues.push((value)=>{
          try {
            let x=onFulfilled(value);
            resolvePromise(newPromise,x,resolve,reject);
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedQueues.push((reason)=>{
          try {
            let x=onRejected(reason);
            resolvePromise(newPromise,x,resolve,reject);
          } catch (e) {
            reject(e);
          }
        })
      })
    }
  }

  catch(onRejected){
    return this.then(undefined,onRejected);
  }

  finally(cb){
    return this.then(value=>{
      Promisex.resolve(cb()).then(()=>value)
    },err=>{
      Promisex.resolve(cb()).then(()=>{throw err})
    })
  }

  static resolve(value){
    if(value instanceof Promisex) return value;
    return new Promisex(resolve=>resolve(value));
  }

  static reject(reason){
    return new Promisex((undefined,reject)=>reject(reason));
  }

  static all(list){
    return new Promisex((resolve,reject)=>{
      let values=[];
      let count=0;
      for(let [i,p] of list.entries()){
        this.resolve(p).then(res=>{
          values[i]=res;
          count++;
          if(count === list.length) resolve(values);
        },err=>{
          reject(err);
        })
      }
    })
  }

  static race(list){
    return new Promisex((resolve,reject)=>{
      for(let p of list){
        this.resolve(p).then(res=>{
          resolve(res);
        },err=>{
          reject(err);
        })
      }
    })
  }
}


function resolvePromise(promise2,x,resolve,reject){
  if(promise2===x){// 如果从onFulfilled中返回的x 就是promise2 就会导致循环引用报错
    return reject(new TypeError('循环引用'))
  }

  let called = false;// 避免多次调用
  // * 1.promise对象
  // * 2.thenable对象/函数
  // * 3.普通值
  if(x instanceof Promisex){
    if(x.state===PENDING){
      x.then(y=>{
        resolvePromise(promise2,y,resolve,reject);
      },reason=>{
        reject(reason)
      })
    }else{
      x.then(resolve,reject);
    }
  }else if(x&&(typeof x==='object'||typeof x==='function')){
    try {
      //是否是thenable对象（具有then方法的对象/函数）
      let then = x.then;
      if(typeof then==='function'){
        then.call(x,y=>{
          if(called)return;
          called=true;
          resolvePromise(promise2,y,resolve,reject);
        },reason=>{
          if(called)return;
          called=true;
          reject(reason);
        })
      }else{//说明是一个普通对象
        resolve(x)
      }
    } catch (e) {
      if(called)return;
      called=true;
      reject(e)
    }
  }else{
    resolve(x);
  }
}

//使用promises-aplus-tests测试
Promisex.deferred = function() {
  // 延迟对象
  let defer = {};
  defer.promise = new Promisex((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};
module.exports = Promisex;
```
最后执行promises-aplus-tests ./xxx.js进行测试
## 2.例子
```javascript
//不论 promise1 被 reject 还是被 resolve 时 promise2 都会被 resolve，只有出现异常时才会被 rejected。
new Promisex((resolve, reject)=>{
  setTimeout(() => {
    reject(2)
  }, 2000);
}).then(res=>{
  console.log(res);
  return res+1;
},e=>{
  return e;//2
}).then(res=>{
  console.log(res)//2
},e=>{
  return e;
})
```

## 3.参考

[Promise详解与实现（Promise/A+规范）](https://www.jianshu.com/p/459a856c476f)

[Promises/A+规范（英文）](https://promisesaplus.com/)

[【翻译】Promises/A+规范](https://www.ituring.com.cn/article/66566)

[Javascript异步编程的4种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)
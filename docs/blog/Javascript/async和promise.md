## async和promise

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>async/await与promise</title>
  </head>
  <body>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      /* async并发 按照顺序返回 */
      async function f() {
        var a1 = new Promise((resolve, reject) => {
          console.log("a1");
          setTimeout(() => {
            console.log("a11");
            resolve("1");
          }, 2000);
        });
        var a2 = new Promise((resolve, reject) => {
          console.log("a2");
          setTimeout(() => {
            console.log("a22");
            resolve("2");
          }, 5000);
        });
        //a1,a2异步同步执行
        //输出a1
        //输出a2

        let foo1 = await a1; //两秒后输出1
        let foo2 = await a2; //输出1后3秒输出2
        //然后执行下面循环
        for (const x of [foo1, foo2]) {
          console.log(x);
        }
        // 22:02:15.383  a1
        // 22:02:15.383  a2
        // 22:02:17.384  a11
        // 22:02:20.384  a22
        // 22:02:20.384  1
        // 22:02:20.384  2
      }

      /* async继发 按照顺序返回 */
      async function f0() {
        var a1 = await new Promise((resolve, reject) => {
          console.log("a1");
          setTimeout(() => {
            console.log("a11");
            resolve("1");
          }, 2000);
        });
        var a2 = await new Promise((resolve, reject) => {
          console.log("a2");
          setTimeout(() => {
            console.log("a22");
            resolve("2");
          }, 5000);
        });
        for (const x of [a1, a2]) {
          console.log(x);
        }
        //先执行a1打印a1,2秒后打印a11。再执行a2打印a2,5秒后打印a22。再执行for循环输出两个值
        // 22:17:07.077 a1
        // 22:17:09.079 a11
        // 22:17:09.080 a2
        // 22:17:14.082 a22
        // 22:17:14.082 1
        // 22:17:14.083 2
      }

      /* Promise并发，按照返回值先后返回数据 ，不按照顺序*/
      function f1() {
        var a1 = new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("a1");
            resolve("1");
          }, 5000);
        });
        var a2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("a2");
            resolve("2");
          }, 2000);
        });
        for (const x of [a1, a2]) {
          console.log(x);//没顺序
        }
        //同步先执行a1,a2,再执行for循环输出两个等待的promise
        // 22:05:52.319  Promise {<pending>}
        // 22:05:52.319  Promise {<pending>}
        // 22:05:54.320  a2
        // 22:05:57.320  a1
      }

      /* async并发，顺序返回 */
      async function f2() {
        var a1 = new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("a1");
            resolve("1");
          }, 5000);
        });
        var a2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("a2");
            resolve("2");
          }, 2000);
        });
        for await (const x of [a1, a2]) {
          console.log(x);
        }
        //同步先执行a1,a2,2秒后打印a2,等待a1返回,之后打印a1.再执行for循环输出两个值
        // 22:11:49.340 a2
        // 22:11:52.338 a1
        // 22:11:52.339 1
        // 22:11:52.339 2
      }

      /* async继发 一个执行完后一个再开始执行*/
      async function x() {
        for (const x of [1, 2, 3]) {
          var t = await new Promise((resolve, reject) => {
            console.log(x);
            setTimeout(() => {
              console.log(x, 1);
              resolve("x" + x);
            }, 3000);
          });
          console.log(t);
        }
        // 22:49:09.689 1
        // 22:49:12.689 1 1
        // 22:49:12.690 x1
        // 22:49:12.690 2
        // 22:49:15.692 2 1
        // 22:49:15.692 x2
        // 22:49:15.692 3
        // 22:49:18.694 3 1
        // 22:49:18.694 x3
      }

      /* async并发 各自返回各自的值*/
      async function y() {
        [0, 1, 2].forEach(async function(x) {
          var t = await new Promise((resolve, reject) => {
            console.log(x);
            setTimeout(() => {
              console.log(x, 1);
              resolve("x" + x);
            }, 2000);
          });
          console.log(t);
        });
        // 22:54:09.299 0
        // 22:54:09.299 1
        // 22:54:09.300 2
        // 22:54:11.301 0 1
        // 22:54:11.301 x0
        // 22:54:11.302 1 1
        // 22:54:11.302 x1
        // 22:54:11.302 2 1
        // 22:54:11.303 x2
      }

      /* 异步Generator函数 */
      function n() {
        async function* asyncGenerator() {
          console.log("start");
          const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(1);
              console.log(3);
            }, 2000);
          });
          yield "result" + result;
          console.log("done");
        }
        asyncGenerator()
          .next()
          .then(data => {
            console.log(data);
          });
        //先输出start，然后等待2秒打印3，然后next返回打印data
        // 23:42:09.615 start
        // 23:42:11.606 3
        // 23:42:11.607 {value: "result1", done: false}
      }

      /* async循环yield* */
      function m() {
        async function* gen1() {
          yield "a";
          yield "b";
          return 2;
        }
        async function* gen2() {
          const result = yield* gen1();
        }

        async function yy() {
          for await (const x of gen2()) {
            console.log(x);
          }
        }
        //a
        //b
      }

      /* axios并发并按顺序返回 */
      function axiosA() {
        var a = axios.get("https://plugins.kancloud.cn/api/plugin/info", {
          params: {
            book: 26419,
            name: "theme-default,highlight"
          }
        });
        function c() {
          return axios.get("/");
        }
        var b = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("yes");
          }, 5000);
        });
        //在这一步c有返回值才开始执行
        axios.all([a, b, c()]).then(
          axios.spread(function(av, bv) {
            // 两个请求现在都执行完成
          })
        );
        //同步完成a和b等待两个都执行完，顺序返回
      }

      /* Promise.all并发按顺序返回 */
      function b(){
        console.log('start')
        function a(){
          console.log('a')
          return axios.get("https://plugins.kancloud.cn/api/plugin/info", {
            params: {
              book: 26419,
              name: "theme-default,highlight"
            }
          })
        }
        function b(){
          console.log('b')
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("yes");
            }, 5000);
          });
        }
        console.log('d')
        var x=Promise.all([a(), b()]).then(([aval, bval]) => {
          console.log('end')
        });
        console.log('c');
        console.log(x);
        // 22:31:46.586 start
        // 22:31:46.587 d
        // 22:31:46.587 a
        // 22:31:46.588 b
        // 22:31:46.588 c
        // 22:31:46.588 Promise {<pending>}
        //ab都有返回值后返回end
      }
      
       /* async/await等待Promise.all返回值后执行后面语句 */
      async function b1(){
        console.log('start')
        function a(){
          console.log('a')
          return axios.get("https://plugins.kancloud.cn/api/plugin/info", {
            params: {
              book: 26419,
              name: "theme-default,highlight"
            }
          })
        }
        function b(){
          console.log('b')
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("yes");
            }, 5000);
          });
        }
        console.log('d')
        var x=await Promise.all([a(), b()]).then(([aval, bval]) => {
          console.log('end')
        });
        console.log('c');
        console.log(x);
        // 22:35:22.656 start
        // 22:35:22.656 d
        // 22:35:22.657 a
        // 22:35:22.657 b
        // 22:35:27.658 end
        // 22:35:27.659 c
        // 22:35:27.659 undefined
      }
    </script>
  </body>
</html>
```
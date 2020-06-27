# 第9章 基于HTTP的功能追加协议

[[toc]]

## 1. 基于HTTP的协议
早期制定者主要想将HTTP当作传输HTML文档的协议。但现在有其他的功能比如在线购物、网络服务等等。虽然功能满足需求，但性能上不是最优。所以有了一些新协议的规则基于HTTP，并在此基础上添加了新的功能。

## 2. 消除HTTP瓶颈的SPDY
SPDY目的是解决HTTP的性能瓶颈，缩短Web页面的加载时间。

### 2.1 HTTP的瓶颈
![以前HTTP通信](/images/HTTP图解/9以前HTTP通信.png)  
 
- Ajax的解决方法  
![Ajax通信](/images/HTTP图解/9Ajax通信.png)  
利用Ajax实时的从服务器获取内容，有可能会导致大量请求产生。

- Comet的解决方法   
一旦服务器端有内容更新了，Comet不会让请求等待，而是直接给客户端返回响应。这是一种通过延迟应答，模拟实现服务器端向客户端推送的功能。

通常，服务器端接收到请求，在处理完毕后就会立即返回响应，但为了实现推送功能，Comet会先将响应置于挂起状态，当服务器端有内容更新时，再返回该响应。

内容上虽然做到了实时更新，但为了保留响应，一次连接的持续时间也变长了，为了维持连接会消耗更多的资源。
![Comet通信](/images/HTTP图解/9Comet通信.png)  

### 2.2 SPDY的设计与功能
SPDY没有完全改写HTTP协议，而是在TCP/IP的应用层与传输层间通过新加会话层的形式运作。考虑到安全性问题，SPDY规定通信中使用SSL。   
![SPDY的设计](/images/HTTP图解/9SPDY的设计.png)  
使用SPDY后，HTTP协议额外获得以下功能：  
- 多路复用流  
通过单一的TCP连接，可以无限制处理多个HTTP请求。因此TCP的处理效率得到提高。

- 赋予请求优先级  
可以给请求逐个分配优先级顺序。可以解决发送多个请求时，因带宽低而导致响应变慢的问题。

- 压缩HTTP首部  
压缩HTTP请求和响应的首部

- 推送功能  
支持服务器主动向客户端推送数据的功能。服务器可直接发送数据，而不必等待客户端请求。

- 服务器提示功能  
服务器可以主动提示客户端请求所需的资源。由于在客户端发现资源之前就可以获知资源的存在，因此在资源已缓存等情况下，可以避免发送不必要的请求。

### 2.3 SPDY消除Web瓶颈了吗？
因为SPDY基本上只是将单个域名（IP地址）的通信多路复用，所以当一个Web网站上使用多个域名下的资源，改善效果就会受到限制。

## 3. 使用浏览器进行全双工通信的WebSocket
通信若使用HTTP协议，就无法彻底解决瓶颈问题。WebSocket网络技术正是为解决这些问题而实现的一套新协议及API。

### 3.1 WebSocket的设计与功能
WebSocket，即Web浏览器与Web服务器之间双全工通信标准。仍在开发的WebSocket技术主要为了解决Ajax和Comet里XMLHTTPRequest附带的缺陷所引起的问题。

### 3.2 WebSocket协议
由于是建立在HTTP基础上的协议，因此连接的发起方仍是客户端，而一旦建立WebSocket通信连接，不论服务器还是客户端，任意一方都可直接向对方发送报文。

WebSocket协议的主要特点：   
- 推送功能  
支持有服务器向客户端推送数据的推送功能。这样服务器就可直接发送数据，而不必等待客户端的请求。

- 减少通信量  
只要建立起WebSocket连接，就希望一直保持连接状态。和HTTP相比，每次连接时的开销减少，而且由于WebSocket的首部信息很小，通信量也就相应的减少了。

#### 握手请求
在HTTP连接建立后，需要完成一次“握手”的步骤。

为了实现WebSocket通信，需要用到HTTP的Upgrade首部字段，告知服务器通信协议发生改变，以达到握手的目的。
![websocket](/images/HTTP图解/9websocket.png)  

#### 握手响应
对于之前的请求，返回状态码101 Switching Protocols的响应。

成功握手确立WebSocket连接后，通信时不再使用HTTP的数据帧，而采用WebSocket独立的数据帧。  
![WebSocket通信](/images/HTTP图解/9WebSocket通信.png)  

#### WebSocket API
```js
var socket=new WebSocket('ws://game.example.com:12345/updates');
socket.onopen=function(){
  setInterval(function(){
    if(socket.bufferedAmount==0){
      socket.send(getUpdateData());
    }
  },50)
}
```
- webSocket.readyState  
readyState属性返回实例对象的当前状态，共有四种。  
CONNECTING：值为0，表示正在连接。   
OPEN：值为1，表示连接成功，可以通信了。   
CLOSING：值为2，表示连接正在关闭。    
CLOSED：值为3，表示连接已经关闭，或者打开连接失败。   

- webSocket.onopen  
实例对象的onopen属性，用于指定连接成功后的回调函数。

如果要指定多个回调函数，可以使用addEventListener方法。

```js
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```
- webSocket.onclose   
实例对象的onclose属性，用于指定连接关闭后的回调函数。   
```js
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};
```
- webSocket.onmessage   
实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。   
```js
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```
- webSocket.send()    
实例对象的send()方法用于向服务器发送数据。
```js
ws.send('your message');
```
- webSocket.bufferedAmount  
实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```js
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```
-  webSocket.onerror  
实例对象的onerror属性，用于指定报错时的回调函数。

```js
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
});
```
WebSocket 服务器的实现可以使用Socket.IO。

## 4. 期盼已久的HTTP/2.0
HTTP/2.0的目标是改善用户在使用Web时的速度体验。

![HTTP2](/images/HTTP图解/9HTTP2.png)  

## 5. Web服务器管理文件的WebDAV
WebDAV（Web-based Distributed Authoring and Versioning,基于万维网的分布式创作和版本控制）是一个可对Web服务器上的内容直接进行文件复制、编辑等操作的分布式文件系统。

![WebDAV](/images/HTTP图解/9WebDAV.png)  
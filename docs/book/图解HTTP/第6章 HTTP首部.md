# 第6章 HTTP首部

[[toc]]

## 1. HTTP报文首部
HTTP协议的请求和响应报文中必定包含HTTP首部。首部内容为客户端和服务器分别处理请求和响应提供所需要的信息。

## 2. HTTP首部字段
当HTTP报文首部中出现了两个或两个以上具有相同首部字段名时会怎么样？  
这种情况在规范中尚未明确，根据浏览器内部处理逻辑的不同，结果可能并不一致。有些浏览器会优先处理第一次出现的首部字段，而有些则会优先处理最后出现的首部字段。

### 2.1 4种HTTP首部字段类型
- 通用首部字段  
请求报文和响应报文两方都会使用的首部。

- 请求首部字段  
从客户端向服务器端发送请求报文时使用的首部。补充了请求的额外内容、客户端信息、响应内容相关优先级等信息。

- 响应首部字段  
从服务器端向客户端返回响应报文时使用的首部。补充了响应的附加内容，也会要求客户端附加额外的内容信息。

- 实体首部字段  
针对请求报文和响应报文的实体部分使用的首部。补充了资源内容更新时间与实体有关的信息。

### 2.1 HTTP/1.1首部字段一览
HTTP/1.1规范定义了如下47种首部字段。

**通用首部字段**  
![通用首部字段](/images/HTTP图解/6通用首部字段.png)

**请求首部字段**  
![请求首部字段](/images/HTTP图解/6请求首部字段.png)

**响应首部字段**  
![响应首部字段](/images/HTTP图解/6响应首部字段.png)

**实体首部字段**  
![实体首部字段](/images/HTTP图解/6实体首部字段.png)

### 2.3 非HTTP/1.1首部字段
HTTP协议中通信交互中使用到的首部字段，不限于RFC2616中定义的47种首部字段。还有Cookie、Set-Cookie和Content-Disposition等在其他RFC中定义的首部字段。

### 2.4 End-to-end首部和Hop-by-hop首部
HTTP首部字段将定义成缓存代理和非缓存代理的行为，分为2种类型。

#### 端到端首部
分在此类别中的**首部会转发给请求/响应对应的最终接收目标**，且必须保存在由缓存生成的响应中，另外规定它必须被转发。

#### 逐跳首部
分在此类别中的**首部只对单次转发有效，会因通过缓存或代理而不再转发**。HTTP/1.1和之后的版本中，如果要使用hop-by-hop首部，需要提供Connection首部字段。

下面列举了HTTP/1.1中的逐跳首部字段。除了这8个首部字段外，其他所有字段都属于端到端首部。
- Connection
- Keep-Alive
- Proxy-Authenticate
- Proxy-Authorization
- Trailer]
- TE
- Transfer-Encoding
- Upgrade

## 3. HTTP/1.1通用首部字段
通用首部字段是指，请求报文和响应报文双方都会使用的首部。

### Cache-Control
Cache-Control能过控制缓存的行为。   
![cache-control](/images/HTTP图解/6cache-control.png)   
指令的参数是可选的，多个指令之间通过逗号分隔。
```
Cache-Control: private,max-age=0,no-cache
```
#### Cache-Control指令一览
- 缓存请求指令
![缓存请求指令](/images/HTTP图解/6缓存请求指令.png)   

- 缓存响应指令
![缓存响应指令](/images/HTTP图解/6缓存响应指令.png)   

#### 表示是否能缓存的指令
**public指令**    
```
Cache-Control: public
```
明确表明其他用户也可以利用缓存。

**private指令**   
响应只以特定的用户作为对象，这与public指令的行为相反。
![private指令](/images/HTTP图解/6private指令.png)   

**no-cache指令**    
使用no-cache指令的目的是为了防止从缓存中返回过期的资源。

![no-cache指令](/images/HTTP图解/6no-cache指令.png)   

客户端发送的请求中如果包含no-cahe指令，则表示客户端将不会接收缓存过的响应。于是，“中间”的缓存服务器必须把客户端请求转发给源服务器。

如果服务器返回的响应中包含no-cahe指令，那么缓存服务器不能对资源进行缓存。源服务器以后也将不在对缓存服务器请求提出的资源有效性进行确认，且禁止其对响应资源进行缓存操作。

```
Cache-Control: no-cache=Location
```
由服务器返回的响应中，若报文首部字段Cache-Control中对no-cache字段具体指定参数，那么客户端在接收到这个被指定参数值的首部字段对应的响应报文后，就不能使用缓存。就是说，无参数值的首部字段可以使用缓存。只能在响应指令中指定该参数。

#### 控制可执行缓存的对象的指令
**no-store指令**
当使用no-store指令时，暗示请求或响应中包含机密信息。缓存不能在本地存储或响应的任一部分。

no-cache代表不缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源。no-store才是真正的不进行缓存。

#### 指定缓存期限和认证的指令
**s-maxage指令**  
```
Cache-Control: s-maxage=604800（单位 ：秒）
```
s-maxage 指令的功能和 max-age 指令的相同，它们的不同点是 s-maxage 指令只适用于供多位用户使用的公共缓存服务器。也就是
说，对于向同一用户重复返回响应的服务器来说，这个指令没有任何
作用。

另外，当使用 s-maxage 指令后，则直接忽略对 Expires 首部字段及 max-age 指令的处理。

**max-age 指令**  
![max-age指令](/images/HTTP图解/6max-age指令.png)   

```
Cache-Control: max-age=604800（单位：秒）
```
当客户端发送的请求中包含 max-age 指令时，如果判定缓存资源的缓
存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。
另外，当指定 max-age 值为 0，那么缓存服务器通常需要将请求转发
给源服务器。

当服务器返回的响应中包含 max-age 指令时，缓存服务器将不对资源
的有效性再作确认，而 max-age 数值代表资源保存为缓存的最长时
间。

应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的情况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。而HTTP/1.0 版本的缓存服务器的情况却相反，max-age 指令会被忽略掉。

**min-fresh 指令**  
![min-fresh指令](/images/HTTP图解/6min-fresh指令.png)   

min-fresh 指令要求缓存服务器返回至少还未过指定时间的缓存资源。  
比如，当指定 min-fresh 为 60 秒后，过了 60 秒的资源都无法作为响应返回了。

**max-stale 指令**  
```
Cache-Control: max-stale=3600（单位：秒）
```
使用 max-stale 可指示缓存资源，即使过期也照常接收。
如果指令未指定参数值，那么无论经过多久，客户端都会接收响应；
如果指令中指定了具体数值，那么即使过期，只要仍处于 max-stale
指定的时间内，仍旧会被客户端接收。

**only-if-cached 指令**   
```
Cache-Control: only-if-cached
```
使用 only-if-cached 指令表示客户端仅在缓存服务器本地缓存目标资源的情况下才会要求其返回。换言之，该指令要求缓存服务器不重新
加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本
地缓存无响应，则返回状态码 504 Gateway Timeout。

**must-revalidate 指令**  
使用 must-revalidate 指令，代理会向源服务器再次验证即将返回的响应缓存目前是否仍然有效。   
若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端
一条 504（Gateway Timeout）状态码。   
另外，使用 must-revalidate 指令会忽略请求的 max-stale 指令（即使已经在首部使用了 max-stale，也不会再有效果）。

**proxy-revalidate 指令**   
proxy-revalidate 指令要求所有的缓存服务器在接收到客户端带有该指令的请求返回响应之前，必须再次验证缓存的有效性。

**no-transform 指令**   
使用 no-transform 指令规定无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。

这样做可防止缓存或代理压缩图片等类似操作。

#### Cache-Control 扩展
cache-extension token   
```
Cache-Control: private, community="UCI"
```
通过 cache-extension 标记（token），可以扩展Cache-Control 首部字段内的指令。

如上例，Cache-Control 首部字段本身没有 community 这个指令。借助 extension tokens 实现了该指令的添加。如果缓存服务器不能理解 community 这个新指令，就会直接忽略。因此，extension tokens 仅对能理解它的缓存服务器来说是有意义的。

### Connection
Connection有两个作用：    
- 控制不在转发给代理的首部字段
- 管理持久连接

#### 控制代理不再转发的首部字段
![Connection1](/images/HTTP图解/6Connection1.png)   
> Connection: 不再转发的首部字段名

在客户端发送请求和服务器返回响应内，使用Connection首部字段，可控制不再转发给代理的首部字段（Hop-by-hop首部，共有8个值）。

#### 管理持久连接
> Connection: close

HTTP/1.1版本的默认连接都是持久连接。客户端会在持久连接上连续发送请求。当服务器想明确断开连接时，则指定Connection首部字段值为close。
![Connection2](/images/HTTP图解/6Connection2.png)   

**HTTP/1.1之前的HTTP版本的默认连接都是非持久连接。所以想要在旧版本的HTTP协议上维持持久连接，则需要指定Connection首部字段的值为Keep-Alive。**

### Date
首部字段Date表明创建HTTP报文的日期和时间。
> Date: Tue, 03 Jul 2012 04:40:59 GMT

### Pragma
Pragma是HTTP/1.1之前版本的历史遗留字段，仅作为与HTTP/1.0的向后兼容而定义。
> Pragma: no-cache

该首部字段属于通用首部字段，但只用在客户端发送的请求中。客户端会要求所有的中间服务器不返回缓存的资源。

整体掌握全部中间服务器使用的HTTP协议版本是不现实的。所以发送时会同时有两个首部字段：  
```
Cache-Control: no-cache
Pragma: no-cache
```

### Trailer
![Trailer](/images/HTTP图解/6Trailer.png)   
Trailer会事先说明在报文主体后记录了哪些首部字段。可用在HTTP/1.1版本分块传输编码时。

![Trailer2](/images/HTTP图解/6Trailer2.png)   
上面代码中，指定Trailer值为Expires，在报文主体之后出现了首部字段Expires。

### Transfer-Encoding
![Transfer-Encoding](/images/HTTP图解/6Transfer-Encoding.png)   
规定了传输报文主体时采用的编码方式。

HTTP/1.1的传输编码方式仅对分块传输编码有效。

> Transfer-Encoding: chunked

### Upgrade
Upgrade用于检测HTTP协议及其他协议是否可使用更高的版本进行通信，其参数值可以用来指定一个完全不同的协议。
![Upgrade](/images/HTTP图解/6Upgrade.png)   

图中，**Upgrade首部字段产生作用的Upgrade对象仅限于客户端和邻接服务器之间。因此，使用首部字段Upgrade时，还需要额外指定Connection: Upgrade。**

对于附有Upgrade的请求，服务器可用101 Switching Protocols状态码作为响应返回。

### Via
使用Via是为了追踪客户端与服务器间的请求和响应报文的传输路径。   
报文经过代理或网关时，会先在首部字段Via中附加该服务器的信息再进行转发。   
Via不仅用于追踪报文的转发，还可避免请求回环的发生。所以必须在经过代理时附加该首部字段内容。

![Via](/images/HTTP图解/6Via.png)   
上面的1.0是指接收请求的服务器上应用的HTTP协议版本。

### Warning
HTTP/1.1的Warning首部是从HTTP/1.0的响应首部（Retry-After）演变过来的。该首部通常会告知用户一些与缓存相关的问题的警告。

![Warning](/images/HTTP图解/6Warning.png)   
![Warning警告码](/images/HTTP图解/6Warning警告码.png)   

## 4. 请求首部字段
请求首部字段是请求报文中所使用的字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级等内容。

### Accept
![Accept](/images/HTTP图解/6Accept.png)   
可以通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。

使用q=可以给媒体类型增加权重优先级，用分号进行分隔。权重值的范围是0~1,默认为q=1.0。当服务器提供多种内容时，将会首先返回权重值最高的媒体类型。

### Accept-Charset
![Accept-Charset](/images/HTTP图解/6Accept-Charset.png)   
可以通知服务器用户代理支持的字符集及字符集的相对优先顺序。

### Accept-Encoding
![Accept-Encoding](/images/HTTP图解/6Accept-Encoding.png)   
用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。
- gzip
- compress
- deflate
- identity：不执行压缩

可以使用*作为通配符，指定任意的编码格式。

### Accept-Language
![Accept-Language](/images/HTTP图解/6Accept-Language.png)   
用来告知服务器用户代理能够处理的自然语言集（中文或英文等），以及语言集的相对优先级。

### Authorization
![Authorization](/images/HTTP图解/6Authorization.png)   
用来告知服务器，用户代理的认证信息。想要通过服务器认证的用户代理会在接收到返回的401状态码响应后，把首部字段Authorization加入请求中。

### Expect
![Expect](/images/HTTP图解/6Expect.png)   
来告知服务器，期望出现的某种特定行为。因服务器无法理解客户端的期望做出回应而发生错误时，会返回状态码417 Expectation Failed。

客户端可以利用该首部字段，写明所期望的扩展。虽然HTTP/1.1规范只定义了100-continue。

### From
![From](/images/HTTP图解/6From.png)   
用来告知服务器使用用户代理的用户的电子邮件地址。通常其目的就是为了显示搜索引擎等用户代理的负责人的电子邮件联系方式。

### Host
![Host](/images/HTTP图解/6Host.png)   
告知服务器，请求的资源所处的互联网主机名和端口号。**Host首部字段在HTTP/1.1规范内是唯一一个必须包含在请求内的首部字段。**

Host和以单台服务器分配多个域名的虚拟主机的工作机制有很密切的关联，这是Host必须存在的意义。

请求被发送至服务器时，请求中的主机名会直接被用IP地址直接替换掉。**但如果这时，相同的IP地址下部署运行多个域名，那么服务器就会无法理解究竟是哪个域名对应的请求。因此，就需要使用Host来明确指出请求的主机名。**

### If-Match
![If-Match](/images/HTTP图解/6If-Match.png)   
形如If-xxx这样的请求首部字段，都可称为条件请求。服务器接收到附带条件的请求后，只有判断指定条件为真时，才会执行请求。
![If-Match-ETag](/images/HTTP图解/6If-Match-ETag.png)   

服务器会对比If-Match的字段值和ETag的值，仅当两者一致时，才会执行请求。否则返回412 Precondition Failed的响应。还可以使用*指定If-Match的字段值。服务器会忽略ETag的值，只要资源存在就处理请求。

### If-Modified-Since
![If-Modified-Since](/images/HTTP图解/6If-Modified-Since.png)   
它会告知服务器若If-Modified-Since字段值早于资源的更新时间，则希望能处理该请求。否则，如果请求的资源都没有过更新，则返回状态码304 Not Modified的响应。

If-Modified-Since用于确认代理或客户端拥有的本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段Last-Modified来确定。

### If-None-Match
![If-None-Match](/images/HTTP图解/6If-None-Match.png)   
它和If-Match作用相反。用于指定If-None-Match字段值的实体标记（ETag）值与请求资源的ETag不一致时，它就告知服务器处理该请求。

在GET或HEAD方法中使用If-None-Match可获取最新的资源。

### If-Range
![If-Range](/images/HTTP图解/6If-Range.png)   
告知服务器若指定的If-Range字段值和请求资源的ETag值相同时，则作为范围请求处理。否则，返回全体资源。

![If-Rangex](/images/HTTP图解/6If-Rangex.png)   
服务器端的资源如果更新，那客户端持有资源中的一部分也会随之无效。这时，服务器会暂且以状态码412 Precondition Failed作为响应返回，其目的是催促客户端再次发送请求。与使用首部字段If-Range比起来，就要花费两倍的功夫。

### If-Unmodified-Since
> If-Unmodified-Since: Thu,03 Jul 2012 00:00:00 GMT
If-Unmodified-Since和If-Modified-Since作用相反。它的作用是告知服务器，指定的请求资源只有在字段值内指定的日期时间之后，未发生更新的情况下，才能处理请求。如果指定的时间发生了更新，则以状态码412 Precodition Failed作为响应返回。

### Max-Forwards
![Max-Forwards](/images/HTTP图解/6Max-Forwards.png)   
通过TRACE或OPTIONS方法，发送包含Max-Forwards的请求时，该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，会将Max-Forward上的值减1后重新赋值。当服务器接收到Max-Forwards值为0的请求时，则不再进行转发，而是直接返回响应。

可以通过它来对传输路径的通信状况有所把握。
![Max-Forwardsx1](/images/HTTP图解/6Max-Forwardsx1.png)   
![Max-Forwardsx2](/images/HTTP图解/6Max-Forwardsx2.png)   

### Proxy-Authorization
> Proxy-Authorization: Basic ksdfjadksdj
接收到从**代理服务器发来的认证质询**时客户端会发送包含首部字段Proxy-Authorization的请求，以告知服务器认证所需要的信息。

这个行为是与客户端和服务端之间的HTTP访问认证相类似的，不同的是，认证行为发生在客户端和代理之间。客户端和服务器间的认证，使用Authorization可起到相同的作用。

### Range
> Range: bytes=5001-10000
对于只需获取部分资源的范围请求，包含首部字段Range即可告知服务器资源的指定范围。

接收到附带Range首部字段请求的服务器，会在处理请求之后返回状态码为206 Partial Content的响应。无法处理该范围请求时，则会返回200 OK的响应及全部资源。

### Referer
![Referer](/images/HTTP图解/6Referer.png)   
会告知服务器请求的原始资源的URI。

客户端一般都会发送Referer给服务器。但当直接在浏览器的地址栏输入URI，或出于安全性的考虑时，也可以不发送该字段。因为原始资源的URI中的查询字符串可能含有ID和密码等保密信息，写进Referer会导致信息泄露。

### TE
> TE: gzip, deflate;q=0.5
TE会告知服务器客户端能够处理响应的**传输编码方式**及相对优先级。它和Accept-Encoding很像，但用于传输编码。

### User-Agent
![User-Agent](/images/HTTP图解/6User-Agent.png)   
User-Agent会将创建请求的浏览器和用户代理名称等信息传达给服务器。

## 5. 响应首部字段
响应首部字段是由服务器端向客户端返回响应报文中所使用的字段，用于补充响应的附加信息、服务器信息，以及对客户端的附加要求等信息。

### Accept-Ranges
![Accept-Ranges](/images/HTTP图解/6Accept-Ranges.png)   
告知客户端，服务器能否处理范围请求，以指定获取服务器端某个部分的资源。可以指定两个值，可处理范围请求时指定为bytes，反之则指定为none。

### Age
![Age](/images/HTTP图解/6Age.png)   
告知客户端，源服务器在多久前创建了响应。单位为秒。

若创建该响应的服务器是缓存服务器，Age值是指缓存后的响应再次发起认证到认证完成的时间值。代理创建响应时必须加上首部字段Age。

### ETag
![ETag](/images/HTTP图解/6ETag.png)   
ETag能告知客户端实体标识。服务器会为每份资源分配对应的ETag值。

当资源更新时，ETag也需要更新。    
![ETag2](/images/HTTP图解/6ETag2.png)    
资源被缓存时，就会被分配唯一的标识。若在下载过程中出现连接中断、再连接的情况，都会依照ETag值来指定资源。

#### 强ETag值和弱ETag值
**强ETag值**
不论发生多么细微的变化都会改变其值。
> ETag: "usagi-1234"

**弱ETag值**
只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变ETag值。会在字段值开始处附加W/。
> ETag: W/"usagi-1234"

### Location
![Location](/images/HTTP图解/6Location.png)    
Location可将响应接收方引导至某个与请求URI位置不同的资源。该字段会配合3XX: Redirection的响应，提供重定向的URI。

### Proxy-Authenticate（认证）
> Proxy-Authenticate: Basic realm="Usagidesign Auth"
Proxy-Authenticate会把代理服务器所要求的认证信息发送给客户端。

它与客户端和服务器间的HTTP访问认证的行为相似，不同之处在于其认证行为是在客户端与代理间进行。而客户端与服务器间进行认证时，WWW-Authorization有着相同的作用。

### Retry-After
![Retry-After](/images/HTTP图解/6Retry-After.png)    
告知客户端应该在多久之后再次发送请求。主要配合状态码503 Service Unavailable 响应，或3XX Redirect响应一起使用。字段值可以指定具体的日期时间（Wed, 04 Jul 2012 0:34:23 GMT等格式），也可以是创建响应后的秒数。

### Server
![Server](/images/HTTP图解/6Server.png)    
告知客户端当前服务器上安装的HTTP服务器应用程序的信息。

### Vary
![Vary](/images/HTTP图解/6Vary.png)    
首部字段Vary可以对缓存进行控制。源服务器会向代理服务器传达关于本地缓存使用方法的命令。

从代理服务器接收到源服务器返回包含Vary指定项的响应后，若再要进行缓存，仅对请求中含有相同Vary指定首部字段的请求返回缓存。即使对相同资源发起请求，但由于Vary指定的首部字段不同，因此必须要从源服务器重新获取资源。

### WWW-Authenticate
> WWW-Authenticate: Basic realm="Usagidesign Auth"
用于HTTP访问认证。会告知客户端适用于访问请求URI所指定资源的认证方案（Basic或Digest）和带参数提示的质询。状态码401 Unauthorized响应中，肯定带有WWW-Authenticate。

## 6. 实体首部字段
实体首部字段是包含在请求报文和响应报文中的实体部分所使用的首部，用于补充内容的更新时间等于实体相关的信息。

### Allow
![Allow](/images/HTTP图解/6Allow.png)    
用于通知客户端能够支持Request-URI指定资源的所有HTTP方法。当服务器接收到不支持的HTTP方法时，会以405 Method Not Allowed作为响应返回。

### Content-Encoding
> Content-Encoding: gzip
会告知客户端服务器对实体的主体部分选用的内容编码方式。主要使用以下4中方式：
- gzip
- compress
- deflate
- identity

### Content-Language
> Content-Language: zh-CN
会告知客户端，实体主体使用的自然语言。

### Content-Length
> Content-Length: 15000
表明了实体主体部分的大小。对实体主体进行内容编码传输时，不能再使用Content-Length。

### Content-Location
> Content-Location: http://www.hackr.jp/xx.html
给出与报文主体部分相对应的URI。和Location不同，Content-Location表示的是报文主体返回资源对应的URI。

### Contnet-MD5
![Content-MD5](/images/HTTP图解/6Content-MD5.png)    
Content-MD5是一串由MD5算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达。

### Content-Range
![Content-Range](/images/HTTP图解/6Content-Range.png)    
针对范围请求，返回响应时使用的首部字段Content-Range，能告知客户端作为响应返回的实体的那个部分符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小。

### Content-Type
> Content-Type: text/html; charset=UTF-8
说明了实体主体内对象的媒体类型。

### Expires
![Expires](/images/HTTP图解/6Expires.png)    
Expires会将资源失效的日期告知客户端。缓存服务器在接收到含有Expires的响应后，会以缓存来应答请求，在Expires指定的时间之前，响应的副本会一直被保存。当超过指定的时间后，缓存服务器在请求发送过来时，会转向源服务器请求资源。

当Cache-Control有指定max-age指令时，比起Expires，会优先处理max-age指令。

### Last-Modified
![Last-Modified](/images/HTTP图解/6Last-Modifiedx.png)    
指明资源最终修改的时间。

## 7. 为Cookie服务的首部字段
Cookie的工作机制是用户识别及状态管理。
![为Cookie服务的首部字段](/images/HTTP图解/6为Cookie服务的首部字段.png)    

### Set-Cookie
> Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31 GMT; path=/; domain=.hackr.jp;

响应首部 Set-Cookie 被用来由服务器端向客户端发送 cookie。
![Set-Cookie字段属性](/images/HTTP图解/6Set-Cookie字段属性.png)    

HttpOnly属性使JS脚本（ Document.cookie 属性、XMLHttpRequest 和  Request APIs 进行访问）无法获得Cookie。其主要目的是为了防止跨站脚本攻击（Cross-site-scripting,XSS）对Cookie的信息窃取。 

### Cookie
Cookie 是一个请求首部，其中含有先前由服务器通过 Set-Cookie  首部投放并存储到客户端的 HTTP cookies。

这个首部可能会被完全移除，例如在浏览器的隐私设置里面设置为禁用cookie。

## 8. 其他首部字段
HTTP首部字段是可以自行扩展的。所以在Web服务器和浏览器的应用上回出现各种非标准的首部字段。

### X-Frame-Options
> X-Frame-Options: DENY

X-Frame-Options HTTP 响应头是用来给浏览器 指示允许一个页面 可否在 \<frame\>, \<iframe\>, \<embed\> 或者 \<object\> 中展现的标记。站点可以通过确保网站没有被嵌入到别人的站点里面，从而避免 clickjacking点击劫持攻击 攻击。
```
X-Frame-Options: deny
X-Frame-Options: sameorigin
X-Frame-Options: allow-from https://example.com/
```
- deny
表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。

- sameorigin
表示该页面可以在相同域名页面的 frame 中展示。

- allow-from uri
表示该页面可以在指定来源的 frame 中展示。

### X-XSS-Protection
> X-XSS-Protection: 1
属于HTTP响应首部，它是针对跨站脚本攻击（XSS）的一种对策，用于控制浏览器XSS防护机制的开关。

- 0：将XSS过滤设置为无效状态
- 1：将XSS过滤设置为有效状态

### DNT（Do Not Track）
DNT属于HTTP请求首部，拒绝个人信息被收集，表示拒绝被精准广告追踪的的一种方法。

- 0：同意被追踪
- 1：拒绝被追踪

#### 使用 JavaScript 读取 “不追踪” （Do Not Track）状态
用户对 DNT 的设置还可以使用 Navigator.doNotTrack 属性进行读取:
```
navigator.doNotTrack; // "0" or "1"
```

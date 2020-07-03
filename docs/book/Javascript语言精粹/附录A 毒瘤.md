# 附录A 毒瘤

1. `object={case:value};`在目前主流版本浏览器中是合法的，但老版本中可能不合法，所以对象中应该避免使用保留字

2. `typeof /a/`主流版本浏览器中返回'object',其他的返回'function'

3. 二进制的浮点数不能正确的处理十进制小数，因此0.1+0.2不等于0.3

4. `isFinite`来判断被传入的参数值是否为一个有限数值
```js
  isFinite(Infinity);  // false
  isFinite(NaN);       // false
  isFinite(-Infinity); // false

  isFinite(0);         // true
  isFinite(2e64);      // true, 在更强壮的Number.isFinite(null)中将会得到false

  isFinite("0");       // true, 在更强壮的Number.isFinite('0')中将会得到false
```
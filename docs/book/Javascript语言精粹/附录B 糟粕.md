# 附录B 糟粕

1. 类型转换
```js
  false=='0'//true 类型不一样字符串优先转换为其他类型（有待考证）
  null==undefined;//true
  false==null//false
  false==undefined//false
```
2. `setTimeout`和`setInternal`他们能接受字符串参数或函数参数，当传递字符串参数是，`setTimeout`和`setInternal`会像`eval`那样处理，应该避免这种字符串参数。

3. 移除`continue`后，性能会得到改善
4. 要学好这门语言，理解函数就是数值是很重要的
5. 在很多语言中，void是一种类型，标识没有值。而在js中，void是一个运算符，他接受一个运算数并返回undefined。这没什么用，而且令人非常困惑。应该避免使用它。
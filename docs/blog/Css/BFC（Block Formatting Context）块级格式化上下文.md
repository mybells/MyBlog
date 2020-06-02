# BFC（Block Formatting Context）块级格式化上下文

 ### BFC 定义

  BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。BFC影响的是内部元素。

  BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。


### BFC布局规则：
1. 在一个块格式化上下文中，盒在垂直方向一个接一个地放置，从包含块的顶部开始。
2. 两个兄弟盒之间的垂直距离由margin属性决定。
3. 同一个块格式化上下文中的相邻块级盒之间的垂直外边距会合并。
4. 同一个块格式化上下文中，每个盒的左外边界（left outer edge）挨着包含块的左外边界（对于从右向左的格式化，右外边界挨着）。
5. BFC的区域不会与float box重叠。
6. 计算BFC的高度时，浮动元素也参与计算。

### 创建BFC：
   - 根元素，即HTML元素
   - float的值不为none
   - overflow的值不为visible
   - display的值为inline-block, table-cell, table-caption, flex, inline-flex
   - position的值为absolute或fixed

因为BFC内部的元素和外部的元素绝对不会互相影响，因此，当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。



[https://www.jianshu.com/p/7e04ed3f4bea](https://www.jianshu.com/p/7e04ed3f4bea)

[https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html](https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
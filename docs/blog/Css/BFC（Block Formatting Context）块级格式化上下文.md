## BFC（Block Formatting Context）块级格式化上下文

 **BFC 定义**

　　BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
　　

**BFC布局规则：**

   内部的Box会在垂直方向，一个接一个地放置。
	Box垂直方向的距离由margin决定。**属于同一个BFC的两个相邻Box的margin会发生重叠**
	每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
	BFC的区域不会与float box重叠。
	**计算BFC的高度时，浮动元素也参与计算**
	BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
	

> 因为BFC内部的元素和外部的元素绝对不会互相影响，因此，
> 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。


**哪些元素会生成BFC?**
根元素
float属性不为none
position为absolute或fixed
display为inline-block, table-cell, table-caption, flex, inline-flex
overflow不为visible



[https://www.jianshu.com/p/7e04ed3f4bea](https://www.jianshu.com/p/7e04ed3f4bea)

[https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html](https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html)
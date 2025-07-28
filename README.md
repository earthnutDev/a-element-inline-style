# a-element-inline-style

一个简单的为 html 原属节点设置行内样式和移除行内样式的（两）函数

可使用自定义 css 属性

## 安装

```sh
npm install --save a-element-inline-style
```

## 使用

设置行内样式

```ts
import { setStyle } from 'a-element-inline-style';

setStyle(document.body, {
  width: '100%',
  '--custom-width': '80%',
});
```

移除行内样式

```ts
import { removeStyle } from 'a-element-inline-style';

removeStyle(document.body, ['width', '--custom-width']);
```

属性命名请使用*小驼峰*

## 文档

参见 [earthnut.dev](https://earthnut.dev/npm/a-element-inline-style)

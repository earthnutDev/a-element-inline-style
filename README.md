# a-element-inline-style

a simple function for set html element inline style or remove inline style

can use for custom style attribute

## language

[English](https://github.com/lmssee/npm-a-element-inline-style/blob/main/README.md) [中文](https://github.com/lmssee/npm-a-element-inline-style/blob/main/自述文件.md)

## install

```sh
npm install --save a-element-inline-style
```

## use

set html element inline style

```ts
import { setStyle } from 'a-element-inline-style';

setStyle(document.body, {
  width: '100%',
  '--custom-width': '80%',
});
```

remove html element inline style

```ts
import { removeStyle } from 'a-element-inline-style';

removeStyle(document.body, ['width', '--custom-width']);
```

_Attribute names only support small humps_

If you have any questions, you can directly [submit question](https://github.com/lmssee/npm-a-element-inline-style/issues/new)

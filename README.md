# a-element-inline-style

a simple function for set html element inline style or remove inline style

can use for custom style attribute

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

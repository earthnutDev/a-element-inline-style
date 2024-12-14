/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName element.ts
 * @CreateDate  周六  09/14/2024
 * @Description 元素的自定义
 ****************************************************************************/
// if (Object.keys(oldStyle).length !== 0) {
//   for (let i = 0, k = Object.keys(oldStyle), j = k.length; i < j; i++) {
//     if (k[i].startsWith('--')) {
//       oldStyle[i] = window
//         .getComputedStyle(node)
//         .getPropertyValue(oldStyle[i]); /// 处理自定义属性
//     } else {
//       /**  @ts-expect-error: 油盐不进  */
//       templateStyle[oldStyle[i]] = oldStyle[oldStyle[i]];
//     }
//   }
// }

/** # 为节点元素设置标准样式
 *
 */
export function setStyle(
  node: HTMLElement | HTMLInputElement,
  style: { [x: string]: string | number },
) {
  node.setAttribute(
    'style',
    transformStyle({ ...getOldStyle(node), ...style }).replaceAll(/;;/gm, ';'),
  );
}

/**  移除样式  */
export function removeStyle(
  node: HTMLElement | HTMLInputElement,
  style: string[],
) {
  node.setAttribute(
    'style',
    transformStyle(getOldStyle(node), style).replaceAll(/;;/gm, ';'),
  );
}

/**********************
 * 获取原有的行内样式
 ***********************/
function getOldStyle(node: HTMLElement | HTMLInputElement) {
  const oldStyle = (node.getAttribute('style') || '')
    .replace(/(;{2,})/gm, ';') // 去除多余的 `;`
    .split(';') // 按 `;` 分割为数组
    .reduce<{
      [x: string]: string | number;
    }>((previousValue, currentValue) => {
      // 使用数组方法进行累计
      if (currentValue.trim() !== '') {
        /** 第一个被找到的下标 */
        const firstIndex = currentValue.indexOf(':');
        /** css Property 属性 */
        let property = currentValue
          .slice(0, firstIndex) // 从元组中切出所需的属性名
          .trim(); /// 去除多余空格

        property = hyphenToCapitalization(property); /// 连字符转大写
        /** css property value 属性值 */
        const propertyValue = node.style[property as never];
        if (propertyValue !== undefined)
          previousValue[property] = propertyValue; // 配置属性
      }
      return previousValue;
    }, {});
  return oldStyle;
}

/*************************
 * 将对象的样式转化为 string
 *
 * 方便赋值
 * @param style              待转化的样式，对象形式方便处理，字符串形式方便赋值
 * @param removeProperty     待移除的属性，是一个字符串数组
 * @returns 返回一个行内样式
 *************************/
function transformStyle(style: object, removeProperty?: string[]) {
  return Object.keys(style).reduce((previousValue, _c) => {
    // 移除属性
    if (removeProperty && removeProperty.includes(_c)) return previousValue;
    return (
      previousValue + `${capitalizationToHyphen(_c)}: ${style[_c as never]};`
    );
  }, '');
}

/**************************
 * 连字符形式转大写
 *
 * @param property   待转化的属性字符串
 **************************/
function hyphenToCapitalization(property: string) {
  return property.startsWith('--')
    ? property
    : property.replace(/([a-z])-([a-z])/g, (_, m1, m2) =>
        m1.concat(m2.toUpperCase()),
      );
}

/**************************
 * 大些转连字符
 * @param property 待转化为连字符形式的字符串
 **************************/
function capitalizationToHyphen(property: string) {
  return property.startsWith('--')
    ? property
    : property.replace(/[A-Z]/gm, letter => `-${letter.toLowerCase()}`);
}

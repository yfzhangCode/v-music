//  动态操作 元素 样式
//  添加class
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return false
  }

  var newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 判断添加class是否存在
export function hasClass(el, className) {
  // 正则匹配 className
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 获取当前点击元素的自定义属性

export function getEleIndex(el, name, val) {
  const Index = 'data-'
  name = Index + name
  console.log(name)
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

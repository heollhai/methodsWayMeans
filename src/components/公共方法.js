/* 
	防抖  节流  倒序排列   正向排列
 */

// 防抖
export function debounce(fn, delay) {
  let timer = null;
  return function() {
    if (timer) {
      clearInterval(timer);
      timer = setTimeout(fn, delay);
    } else {
      timer = setTimeout(fn, delay);
    }
  };
}

// 节流
export function throttle(fn, delay) {
  let canRun = true;
  return function() {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, delay);
  };
}

// 针对对象里面的值进行   ------- 倒序排列
export function againsTsortKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
}

// 针对对象里面的值进行   ------- 正向排列
export function JustSortKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x > y ? 1 : x < y ? -1 : 0;
  });
}

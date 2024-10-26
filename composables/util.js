// 将query参数转为url
export function queryToUrl(query) {
  let q = [];
  for (const key in query) {
    if (query[key]) {
      q.push(`${key}=${encodeURIComponent(query[key])}`);
    }
  }
  let r = q.join("&");
  r = r ? "?" + r : "";
  return r;
}

export function formateDate(timeStr) {
  return timeStr.split("Z")[0].split("T").join(" ");
}

// 节流函数
export function throttle(fn, delay = 200) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return; // 如果距离上次调用时间小于delay，则不执行
    }
    lastCall = now;
    return fn.apply(this, args);
  };
}

// 防抖函数
export function debounce(fn, delay = 200) {
  let timer = null;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

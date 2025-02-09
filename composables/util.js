import { ElNotification } from "element-plus";

export function toast(message, type = "success") {
  ElNotification({
    message,
    type,
    duration: 1500,
    zIndex: 3000,
  });
}

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
// 时间格式化 对应后端的timestamp
export function formateDate(timeStr) {
  console.log(timeStr);

  if (
    typeof timeStr !== "string" ||
    !timeStr.includes("T") ||
    !timeStr.includes("Z")
  ) {
    return "刚刚";
  }
  const parts = timeStr.split("Z");
  if (parts.length === 0) {
    return "1970-01-01 00:00:00";
  }
  const dateTime = parts[0].split("T");
  if (dateTime.length !== 2) {
    return "1970-01-01 00:00:00";
  }
  return dateTime.join(" ");
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

export function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function resetForm(form) {
  for (const key in form) {
    if (typeof form[key] === "string") {
      form[key] = "";
    } else if (typeof form[key] === "number") {
      form[key] = 0;
    } else if (typeof form[key] === "boolean") {
      form[key] = false;
    } else if (Array.isArray(form[key])) {
      form[key] = [];
    } else if (typeof form[key] === "object" && form[key] !== null) {
      form[key] = {};
    }
  }
}

export function genRandomKey() {
  // Math.random()：生成一个随机数，并将其转换为 36 进制字符串。
  // substring(2, 9)：截取字符串的第 2 到第 10 个字符，以去掉 0. 前缀并限制长度。
  // Date.now()：获取当前时间戳，确保生成的键是唯一的。
  return "key_" + Math.random().toString(36).substring(2, 9);
}
export function getNowEquipment() {
  let facilityType = "computer";
  let windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    facilityType = "mobile";
  } else if (768 <= windowWidth && windowWidth < 992) {
    facilityType = "ipad";
  }
  return facilityType;
}

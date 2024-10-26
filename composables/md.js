// 修改事件监听
export function handleBeforeLeave(e) {
  if (ifEdit.value && editContent.value) {
    e = e || window.event;
    // 兼容 IE8 及更早版本
    let confirmationMessage = "确认离开页面?";
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
}

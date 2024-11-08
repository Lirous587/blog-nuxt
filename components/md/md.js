import { uploadImg } from "~/api/admin";

// 上传图片
export async function handleUploadImage(event, insertImage, files) {
  try {
    // 获取上传的图片文件
    const file = files[0]; // 假设只上传了一张图片
    // 创建一个 FormData 对象，并将图片文件添加到其中
    const formData = new FormData();
    formData.append("img", file);

    await uploadImg(formData);

    const apiBase = useRuntimeConfig().public.apiBase;

    previewRef.value.insert(function (selected) {
      const placeholder = `![Description](${apiBase}/img/${file.name})`;
      const content = selected || placeholder;
      return {
        text: `${placeholder}`,
        selected: content,
      };
    });
  } catch (error) {
    toast("上传失败", "error");
  }
}

export const disposeMdAnchor = (md) => {
  const hList = md.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");

  let anchors = Array.from(hList).filter((anchor) => !!anchor.innerText.trim());

  if (!anchors.length) {
    anchors = [];
    return { anchors };
  }

  const hLevel = Array.from(
    new Set(anchors.map((anchor) => anchor.tagName))
  ).sort();

  anchors = anchors.map((el, index) => ({
    id: `${index}`,
    title: el.innerText,
    indent: hLevel.indexOf(el.tagName),
  }));

  let sList = [];

  hList.forEach((el, index) => {
    const anchorValue = anchors[index].id;
    el.id = anchorValue;

    const aEl = document.createElement("a");

    const hContent = el.innerHTML;

    el.innerHTML = "";

    aEl.innerHTML = hContent;

    aEl.setAttribute("href", `#${anchorValue}`);

    sList.push(`--t${index}`);
    el.appendChild(aEl);
  });

  const currentHash = window.location.hash.slice(1);

  console.log(currentHash);

  document.body.style.timelineScope = sList.join(",");

  addDivOuter(md);

  return {
    anchors,
  };
};

const addDivOuter = (md) => {
  const mdBody = md.value.$el.querySelector(".vuepress-markdown-body");
  // 拿到全部的子元素
  const elements = Array.from(mdBody.childNodes);
  const fragment = document.createDocumentFragment();
  let currentDiv = null;
  let index = 0;

  elements.forEach((el) => {
    if (el.nodeType === Node.ELEMENT_NODE && el.tagName.startsWith("H")) {
      // 如果遇到新的 h 标签，创建新的 div 并追加到 fragment
      if (currentDiv) {
        fragment.appendChild(currentDiv);
      }
      currentDiv = document.createElement("div");
      currentDiv.style.setProperty("--s", `--t${index}`);
      currentDiv.style.setProperty("view-timeline-name", "var(--s)");
      currentDiv.style.setProperty("view-timeline-inset", "0.1% 99.9%");
      currentDiv.appendChild(el);
      index++;
    } else if (currentDiv) {
      // 将其他元素添加到当前的 div 中
      currentDiv.appendChild(el);
    }
  });

  // 追加最后一个 div
  if (currentDiv) {
    fragment.appendChild(currentDiv);
  }

  // 清空原始内容并追加新的内容
  mdBody.innerHTML = "";
  mdBody.appendChild(fragment);
};

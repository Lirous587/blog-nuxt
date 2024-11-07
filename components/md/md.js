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

export const disposeMdAnchor = (md, router) => {
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

  hList.forEach((el, index) => {
    const anchorValue = anchors[index].id;
    el.id = anchorValue;

    const aEl = document.createElement("a");

    const hContent = el.innerHTML;

    el.innerHTML = "";

    aEl.innerHTML = hContent;

    aEl.setAttribute("href", `#${anchorValue}`);

    el.appendChild(aEl);
  });

  return {
    anchors,
  };
};

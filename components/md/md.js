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

  const anchors = ref(
    Array.from(hList).filter((anchor) => !!anchor.innerText.trim())
  );

  if (!anchors.value.length) {
    anchors.value = [];
    return { anchors };
  }

  const hLevel = Array.from(
    new Set(anchors.value.map((anchor) => anchor.tagName))
  ).sort();

  anchors.value = anchors.value.map((el, index) => ({
    id: `${index}`,
    title: el.innerText,
    indent: hLevel.indexOf(el.tagName),
    active: false,
  }));

  const myObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const { id } = entry.target;
        if (entry.isIntersecting) {
          anchors.value.forEach((anchor) => {
            anchor.active = false;
          });
          anchors.value[id].active = true;
        }
      });
    },
    {
      rootMargin: "0px 0px -99% 0px",
    }
  );

  hList.forEach((el, index) => {
    const anchorValue = anchors.value[index].id;
    el.id = anchorValue;

    myObserver.observe(el);

    const aEl = document.createElement("a");

    const hContent = el.innerHTML;

    el.innerHTML = "";

    aEl.innerHTML = hContent;

    aEl.setAttribute("href", `#${anchorValue}`);

    el.appendChild(aEl);
  });

  const currentHash = window.location.hash.slice(1);

  currentHash ? hList[currentHash].firstChild.click() : "";

  return {
    anchors,
  };
};

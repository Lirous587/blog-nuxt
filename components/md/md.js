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

export const disposeMdAnchor = (anchorIdList) => {
  const hList = anchorIdList.map((id) => document.getElementById(id));

  const anchors = ref(
    Array.from(hList).map((el, index) => ({
      id: anchorIdList[index],
      title: el.innerText,
      active: false,
    }))
  );

  const myObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const { id } = entry.target;
        console.log(entry.target);
        if (entry.isIntersecting) {
          anchors.value.forEach((anchor) => {
            anchor.active = false;
          });
          anchors.value.find((item) => item.id === id).active = true;
        }
      });
    },
    {
      rootMargin: "0px 0px -99% 0px",
    }
  );

  hList.forEach((el, index) => {
    el.id = anchorIdList[index];
    myObserver.observe(el);
  });

  // const currentHash = window.location.hash.slice(1);

  // currentHash ? hList[currentHash].firstChild.click() : window.scrollTo(0, 0);

  return {
    anchors,
  };
};

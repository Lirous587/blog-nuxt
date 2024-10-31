export const disposeMdAnchor = (md, router) => {
  const hList = md.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");

  let anchors = Array.from(hList).filter((anchor) => !!anchor.innerText.trim());

  const nowHash = ref("");

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

    aEl.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      router.push(`#${anchorValue}`);
    };

    el.appendChild(aEl);
  });

  const scrollHandel = () => {
    let distanceList = Array.from(
      {
        length: anchors.length,
      },
      () => {
        return {
          elIndex: 0,
          distance: 0,
        };
      }
    );

    hList.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const distance = Math.abs(rect.top);
      distanceList[index].elIndex = index;
      distanceList[index].distance = distance;
    });

    // 正确的排序逻辑
    distanceList.sort((a, b) => a.distance - b.distance);

    // 获取距离最近的元素
    const closestElement = distanceList[0];

    nowHash.value = anchors[closestElement.elIndex].id;
    history.replaceState(null, "", `#${nowHash.value}`);
  };

  const throttleScroll = throttle(scrollHandel);
  window.addEventListener("scroll", throttleScroll);

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", throttleScroll);
  });

  return {
    anchors,
    hList,
    nowHash,
  };
};

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
    id: index,
    title: el.innerText,
    indent: hLevel.indexOf(el.tagName),
  }));

  hList.forEach((el, index) => {
    const anchorValue = anchors[index].id;
    el.id = anchorValue;

    const aEl = document.createElement("a");

    const originalContent = el.innerHTML;

    el.innerHTML = "";

    aEl.innerHTML = originalContent;

    aEl.setAttribute("href", `#${anchorValue}`);

    aEl.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      const targetElement = document.getElementById(anchorValue);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      router.push(`#${anchorValue}`);
    };
    el.appendChild(aEl);
  });

  return {
    anchors,
  };
};

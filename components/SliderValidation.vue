<template>
  <div
    class="fixed flex right-0 top-0 left-0 bottom-0 z-[9999] bg-black/80"
    :class="visiable ? 'fixed' : 'hidden'"
  >
    <div
      id="handle"
      class="validationBox flex flex-col items-center m-auto"
      :style="{
        '--img-box-width': width,
        '--img-box-height': height,
        '--clip-box-width': clipSize.width + 'px',
        '--clip-box-height': clipSize.height + 'px',
        '--random-x': randomPosition.x + 'px',
        '--random-y': randomPosition.y + 'px',
        '--left-offest': leftOffest + 'px',
      }"
      ref="validationBox"
    >
      <div class="bg-neutral-300 p-8 relative flex flex-col items-center">
        <div class="right-0 top-0 absolute">
          <el-button type="warning" icon="Close" circle @click="close" />
        </div>
        <div class="left-0 top-0 absolute">
          <el-button type="warning" icon="Refresh" circle @click="refresh" />
        </div>
        <div
          class="img-box"
          :style="{
            backgroundImage: `url(${randomImg})`,
          }"
          ref="imgBox"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMyIndexStore } from "~/store";
const imgPre = useRuntimeConfig().public.imgGalleryBase;
const indexStore = useMyIndexStore();
const emits = defineEmits(["confirm"]);
const imglist = indexStore.getImgList();

const validationBox = ref(null);
const imgBox = ref(null);

const randomImg = ref(
  imgPre + imglist[Math.floor(imglist.length * Math.random())].url
);

const props = defineProps({
  width: {
    type: String,
    default: "400px",
  },
  height: {
    type: String,
    default: "260px",
  },
});

const clipSize = reactive({
  width: 50,
  height: 50,
});

const randomPosition = reactive({
  x: 0,
  y: 0,
});

const visiable = ref(false);

const leftOffest = ref(Math.max(Math.floor(Math.random() * 250), 200));

const resetSlider = () => {
  // 获取容器实际像素值
  const imgBoxWidth = parseFloat(getComputedStyle(imgBox.value).width);
  const imgBoxHeight = parseFloat(getComputedStyle(imgBox.value).height);

  const maxRandomX = imgBoxWidth - clipSize.width;
  const minRandomX = Math.floor(imgBoxWidth / 2);
  randomPosition.x =
    Math.floor(Math.random() * (maxRandomX - minRandomX + 1)) + minRandomX;

  const maxRandomY = imgBoxHeight - 1.5 * clipSize.height;
  const minRandomY = Math.floor(imgBoxHeight / 2);
  randomPosition.y =
    Math.floor(Math.random() * (maxRandomY - minRandomY + 1)) + minRandomY;
};

const handleResize = () => {
  resetSlider();
};

let ifDrag = false;
let startX;

const startDrag = (ev) => {
  ifDrag = true;
  startX = ev.clientX || ev.touches[0].clientX;
};

const moveDrag = (ev) => {
  if (ifDrag) {
    const clientX = ev.clientX || ev.touches[0].clientX;
    const move = `${clientX - startX}px`;
    validationBox.value.style.setProperty("--dynamic-move", move);
  }
};

const endDrag = (ev) => {
  ifDrag = false;
  const clientX = ev.clientX || ev.changedTouches[0].clientX;
  const currentPosition = clientX - startX;
  const dis = Math.abs(currentPosition - leftOffest.value);
  // 允许10px的误差范围
  if (dis < 20) {
    imgBox.value.classList.add("passed");
    setTimeout(() => {
      sumbit();
    }, 200);
  } else {
    validationBox.value.style.setProperty("--dynamic-move", "0px");
  }
};

const open = () => {
  // 滚动锁定
  document.body.style.overflow = "hidden";
  visiable.value = true;

  imgBox.value.addEventListener("mousedown", startDrag);
  imgBox.value.addEventListener("touchstart", startDrag);

  window.addEventListener("mousemove", moveDrag);
  window.addEventListener("touchmove", moveDrag);

  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);

  window.addEventListener("resize", throttle(handleResize));
};

const close = () => {
  // 恢复滚动
  document.body.style.overflow = "";
  visiable.value = false;

  imgBox.value.removeEventListener("mousedown", startDrag);
  imgBox.value.removeEventListener("touchstart", startDrag);

  window.removeEventListener("mousemove", moveDrag);
  window.removeEventListener("touchmove", moveDrag);

  window.removeEventListener("mouseup", endDrag);
  window.removeEventListener("touchend", endDrag);

  window.removeEventListener("resize", throttle(handleResize));
};

const refresh = () => {
  let equal = true;
  while (equal) {
    let random =
      imgPre + imglist[Math.floor(imglist.length * Math.random())].url;
    if (random !== randomImg.value) {
      randomImg.value = random;
      resetSlider();
      equal = false;
    }
  }
};

const sumbit = () => {
  close();
  emits("confirm");
};

onMounted(() => {
  resetSlider();
});

defineExpose({
  open,
});
</script>

<style scoped>
@reference "assets/css/tailwind.css";

.validationBox {
  --dynamic-move: 0px;
  --move: clamp(0px, var(--dynamic-move), calc(1 * var(--img-box-width)));
}

.img-box {
  width: var(--img-box-width);
  height: var(--img-box-height);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
}

.img-box::after,
.img-box::before {
  content: "";
  position: absolute;
  background: inherit;
  height: inherit;
  width: inherit;
  border: solid 5px palevioletred;
  /* 上右下左 */
  clip-path: inset(
    var(--random-y)
      calc(var(--img-box-width) - var(--random-x) - var(--clip-box-width))
      calc(var(--img-box-height) - var(--random-y) - var(--clip-box-height))
      var(--random-x)
  );
}

.img-box::before {
  background-color: rgba(0, 0, 0, 0.7);
  background-blend-mode: multiply;
}

.img-box::after {
  @apply animate-pulse;
  left: calc(-1 * var(--left-offest));
  position: absolute;
  transform: translateX(var(--move));
  transition: transform 0.5s ease-in;
}

#handle:active .img-box::after {
  transition: none;
}

.passed::after,
.passed::before {
  opacity: 0;
}
</style>

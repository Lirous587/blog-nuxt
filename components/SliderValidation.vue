<template>
  <teleport to="body">
    <div
      class="absolute inset-0 z-10 bg-black/80 flex items-center justify-center"
      :class="visiable ? 'absolute' : 'hidden'"
    >
      <div
        id="handle"
        class="validationBox"
        :style="{
          '--img-box-width': imgSize.width + 'px',
          '--img-box-height': imgSize.height + 'px',
          '--clip-box-size': clipSize + 'px',
          '--random-x': randomPosition.x + 'px',
          '--random-y': randomPosition.y + 'px',
          '--left-offest': leftOffest + 'px',
        }"
        ref="validationBox"
      >
        <div class="mx-auto bg-white p-4 md:p-6 lg:p-8">
          <!-- <div class="flex justify-between">
          <el-button type="warning" icon="Close" circle @click="close" />
          <el-button type="warning" icon="Refresh" circle @click="refresh" />
        </div> -->
          <div
            class="img-box"
            :style="{
              backgroundImage: `url(${randomImg})`,
            }"
            ref="imgBox"
          ></div>
          <!-- bg-[rgb(211,245,241)] -->
          <div
            class="flex items-center h-[40px] mt-3 bg-gray-300 border border-pink-400 overflow-hidden"
          >
            <div
              class="h-[42px] w-[42px] flex bg-white text-pink-300 hover:bg-blue-400 hover:text-white shadow-lg rounded-sm transition-colors duration-300"
            >
              <el-icon class="m-auto" size="24"><DArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const imgPre = useRuntimeConfig().public.imgGalleryBase;

const indexStore = useMyIndexStore();

const emits = defineEmits(["confirm"]);

const carousels = indexStore.getCarousels();

const validationBox = ref(null);
const imgBox = ref(null);

const imgSize = reactive({
  width: 0,
  height: 0,
});

const clipSize = ref(50);

const aspectRatio = 16 / 9;

const setAspect = () => {
  const windowWidth = parseFloat(
    getComputedStyle(document.documentElement).width
  );
  const nowEquipment = getNowEquipment();
  if (nowEquipment === "computer") {
    imgSize.width = windowWidth * 0.3;
  } else if (nowEquipment === "ipad") {
    imgSize.width = windowWidth * 0.35;
  } else {
    imgSize.width = windowWidth * 0.8;
  }
  clipSize.value = imgSize.width * 0.1;
  imgSize.height = imgSize.width / aspectRatio;
};

const randomImg = ref(
  imgPre + carousels[Math.floor(carousels.length * Math.random())].img.url
);

const randomPosition = reactive({
  x: 0,
  y: 0,
});

const leftOffest = ref(Math.max(Math.floor(Math.random() * 250), 200));

const resetSlider = () => {
  setAspect();
  // 获取容器实际像素值
  const imgBoxWidth = parseFloat(getComputedStyle(imgBox.value).width);
  const imgBoxHeight = parseFloat(getComputedStyle(imgBox.value).height);

  const maxRandomX = imgBoxWidth - clipSize.value;
  const minRandomX = Math.floor(imgBoxWidth / 2);
  randomPosition.x =
    Math.floor(Math.random() * (maxRandomX - minRandomX + 1)) + minRandomX;

  const maxRandomY = imgBoxHeight - 1.5 * clipSize.value;
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

const visiable = ref(false);
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
      imgPre + carousels[Math.floor(carousels.length * Math.random())].img.url;
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
      calc(var(--img-box-width) - var(--random-x) - var(--clip-box-size))
      calc(var(--img-box-height) - var(--random-y) - var(--clip-box-size))
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

<template>
  <!-- <teleport to="body"> -->
  <div
    class="absolute inset-0 z-10 bg-black/80 flex items-center justify-center"
    :class="visiable ? 'absolute' : 'hidden'"
  >
    <div
      class="validationBox"
      :style="{
        '--img-box-width': imgSize.width + 'px',
        '--img-box-height': imgSize.height + 'px',
        '--clip-box-size': clipSize + 'px',
        '--random-x': randomPosition.x + 'px',
        '--random-y': randomPosition.y + 'px',
      }"
      ref="validationBoxRef"
    >
      <div class="mx-auto bg-white rounded dark:bg-gray-900 p-4 md:p-6 lg:p-8">
        <div class="flex items-center justify-between mb-1">
          <el-button text icon="Refresh" @click="resetSlider"></el-button>
          <el-button text icon="close" @click="close"></el-button>
        </div>
        <div
          class="img-box relative rounded"
          :style="{
            backgroundImage: `url(${randomImg})`,
          }"
          ref="imgBoxRef"
        ></div>
        <div
          class="relative flex items-center mt-3 bg-gray-300 dark:bg-gray-600 border border-pink-400 overflow-hidden"
          style="height: var(--clip-box-size)"
        >
          <!-- 滑动时填充 -->
          <div
            class="filler absolute top-0 bottom-0 left-0 w-[0px] bg-green-400 dark:bg-red-400 transition-all ease-in duration-500"
            style="width: var(--dynamic-move)"
          ></div>
          <!-- 滑块 -->
          <div
            class="slider flex z-[1] shadow-lg rounded transition-colors duration-300"
            :class="
              ifDraging
                ? 'bg-blue-400 dark:bg-green-500 text-white'
                : 'bg-white dark:bg-green-300 text-black'
            "
            style="width: var(--clip-box-size); height: var(--clip-box-size)"
            ref="sliderRef"
          >
            <el-icon class="m-auto" v-if="pass"><Check /></el-icon>
            <el-icon class="m-auto" v-else><Right /></el-icon>
          </div>
          <!-- 文字 -->
          <el-text
            v-show="!dragStatus"
            class="z-[0] absolute inset-0 text-center"
            >向右滑动滑块</el-text
          >
        </div>
      </div>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<script setup>
import { useMyIndexStore } from "~/store";

const imgPre = useRuntimeConfig().public.imgGalleryBase;

const indexStore = useMyIndexStore();

const emits = defineEmits(["confirm"]);

const carousels = indexStore.getCarousels();

const validationBoxRef = ref(null);
const sliderRef = ref(null);
const imgBoxRef = ref(null);

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
    imgSize.width = windowWidth * 0.4;
    clipSize.value = 45;
  } else if (nowEquipment === "ipad") {
    imgSize.width = windowWidth * 0.45;
    clipSize.value = 40;
  } else {
    imgSize.width = windowWidth * 0.75;
    clipSize.value = 35;
  }
  if (imgSize.width < 300) {
    imgSize.width = 300;
  }
  imgSize.height = imgSize.width / aspectRatio;
};

const randomImg = ref(
  imgPre + carousels[Math.floor(carousels.length * Math.random())].img.url
);

const randomPosition = reactive({
  x: 0,
  y: 0,
});

const resetSlider = () => {
  setAspect();
  // 获取容器实际像素值
  if (!imgBoxRef.value) return;
  const imgBoxWidth = parseFloat(getComputedStyle(imgBoxRef.value).width);
  const imgBoxHeight = parseFloat(getComputedStyle(imgBoxRef.value).height);

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

let startX;
const ifDraging = ref(false);
const dragStatus = ref(false);
const pass = ref(false);

const startDrag = (ev) => {
  ifDraging.value = true;
  dragStatus.value = true;
  validationBoxRef.value.classList.add("active");
  startX = ev.clientX;
};

let animationFrameId = null;
const moveDrag = (ev) => {
  if (!validationBoxRef.value || !ifDraging.value) return;
  if (animationFrameId) return;
  animationFrameId = requestAnimationFrame(() => {
    const clientX = ev.clientX;
    const moveDistance = clientX - startX;
    validationBoxRef.value.style.setProperty(
      "--dynamic-move",
      `${moveDistance}px`
    );
    animationFrameId = null;
  });
};

const endDrag = (ev) => {
  if (!imgBoxRef.value || !validationBoxRef.value) return;
  ifDraging.value = false;
  validationBoxRef.value.classList.remove("active");
  const clientX = ev.clientX;
  const currentPosition = clientX - startX;
  const dis = Math.abs(currentPosition - randomPosition.x);
  // 允许15px的误差范围
  if (dis < 15) {
    imgBoxRef.value.classList.add("passed");
    pass.value = true;
    setTimeout(() => {
      sumbit();
    }, 200);
  } else {
    validationBoxRef.value.style.setProperty("--dynamic-move", "0px");
    setTimeout(() => {
      dragStatus.value = false;
    }, 500);
  }
};

const visiable = ref(false);
const open = () => {
  resetSlider();
  // 滚动锁定
  document.body.style.overflow = "hidden";
  visiable.value = true;

  // 使用 pointer 事件注册，确保选项中 passive 为 false
  sliderRef.value.addEventListener("pointerdown", startDrag, {
    passive: false,
  });
  window.addEventListener("pointermove", moveDrag, { passive: false });
  window.addEventListener("pointerup", endDrag, { passive: false });
  window.addEventListener("resize", throttle(handleResize, 100));
};
const close = () => {
  // 恢复滚动
  document.body.style.overflow = "";
  visiable.value = false;

  sliderRef.value.removeEventListener("pointerdown", startDrag);
  window.removeEventListener("pointermove", moveDrag);
  window.removeEventListener("pointerup", endDrag);
  window.removeEventListener("resize", throttle(handleResize, 100));
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
.validationBox {
  --dynamic-move: 0px;
  --move: clamp(
    0px,
    var(--dynamic-move),
    calc(1 * var(--img-box-width) - var(--clip-box-size))
  );
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
  /* 上右下左 */
  clip-path: inset(
    var(--random-y)
      calc(var(--img-box-width) - var(--random-x) - var(--clip-box-size))
      calc(var(--img-box-height) - var(--random-y) - var(--clip-box-size))
      var(--random-x)
  );
  filter: contrast(1.2);
}

.img-box::before {
  background-color: rgba(0, 0, 0, 0.8);
  background-blend-mode: multiply;
}

.img-box::after {
  background-color: rgba(0, 0, 0, 0.8);
  left: calc(-1 * var(--random-x));
  position: absolute;
  filter: contrast(1.5) brightness(1.5);
}

.img-box::after,
.slider {
  transform: translateX(var(--move));
  transition: transform 0.5s ease-in;
  touch-action: none;
}

.validationBox.active .img-box::after,
.validationBox.active .slider,
.validationBox.active .filler {
  transition: none;
}

.passed::after,
.passed::before {
  opacity: 0;
}
</style>

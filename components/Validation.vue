<template>
  <el-input v-model="validationCode" placeholder="验证码">
    <template #prefix>
      <el-icon><ChatLineRound /></el-icon>
    </template>
    <template #suffix>
      <el-button
        :loading="btnLoading"
        @click="emits('sent')"
        size="small"
        :class="ifSend ? 'pointer-events-none cursor-not-allowed' : ''"
        :type="ifSend ? 'warning' : 'success'"
      >
        {{ ifSend ? `${waitTime}s` : "获取" }}
      </el-button>
    </template>
  </el-input>
</template>

<script setup>
const validationCode = defineModel("validationCode", {
  type: String,
  required: true,
});

const props = defineProps({
  validator: {
    type: Function,
    required: true,
  },
});

const ifSend = ref(false);
const waitTime = ref(60);
const btnLoading = ref(false);

const timer = () => {
  let timer = setInterval(() => {
    waitTime.value -= 1;
    if (waitTime.value === 0) {
      ifSend.value = false;
      waitTime.value = 60;
      clearInterval(timer);
    }
  }, 1000);
};

const sumbit = () => {
  btnLoading.value = true;
  props.validator().then(() => {
    ifSend.value = true;
    btnLoading.value = false;
    timer();
  });
};

const emits = defineEmits(["sent"]);

defineExpose({
  sumbit,
});
</script>

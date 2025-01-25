<template>
  <div class="flex items-center gap-3 flex-wrap">
    <el-tag
      v-for="(tag, index) in tags"
      class="my-2"
      :key="index"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>

    <el-input
      v-if="inputVisible"
      ref="inputRef"
      v-model="inputValue"
      class="w-20"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" @click="showInput">
      {{ props.addText }}
    </el-button>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  addText: {
    type: String,
    default: "+ 添加",
  },
});

const tags = ref(props.list);
if (!Array.isArray(props.list)) {
  tags.value = [];
}

const inputValue = ref("");
const inputVisible = ref(false);
const inputRef = ref();
const showEdit = ref(Array(tags.value.length).fill(false));

const handleClose = (tag) => {
  tags.value.splice(tags.value.indexOf(tag), 1);
  emits("change", tags.value);
};

const showInput = () => {
  inputVisible.value = true;
  showEdit.value.fill(false);
  nextTick(() => {
    inputRef.value.focus();
  });
};

const handleInputConfirm = () => {
  let tag = inputValue.value.split(" ").join("").toLowerCase();
  if (tags.value.includes(tag)) {
    toast("非法或已有关键词", "warning");
    return;
  }
  if (tag && !tag.includes(",")) {
    tags.value.push(tag);
    showEdit.value.push(false);
    emits("change", tags.value);
  } else {
    toast("非法关键词", "warning");
  }
  inputVisible.value = false;
  inputValue.value = "";
};
const emits = defineEmits(["change"]);
emits("change", tags.value);
</script>

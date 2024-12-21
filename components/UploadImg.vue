<template>
  <div>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      accept="image/*"
      class="hidden"
    />
    <div @click="triggerFileInput">
      <slot name="default" v-if="!previewUrl"></slot>
      <slot name="preview" v-else :previewUrl="previewUrl"> </slot>
    </div>
  </div>
</template>

<script setup>
const imgData = defineModel("imgData", {
  type: Object,
  required: true,
});

const previewUrl = ref("");
const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = async () => {
  const file = fileInput.value.files[0];
  if (!file) return;
  previewUrl.value = URL.createObjectURL(file);
  imgData.value = file;
};
</script>

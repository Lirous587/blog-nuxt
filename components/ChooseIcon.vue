<template>
  <div class="flex items-center" style="width: 100%">
    <div class="flex justify-center items-center">
      <el-icon size="24px">
        <component :is="iconModel"></component>
      </el-icon>
    </div>
    <div style="width: 90%">
      <el-select
        :modelValue="iconModel"
        class="ml-2"
        filterable
        placeholder="请选择图标"
        @change="hanlerChange"
      >
        <el-option
          v-for="item in icons"
          :key="item"
          :label="item"
          :value="item"
          class="dark:bg-black"
        >
          <div class="flex items-center justify-between">
            <el-icon :size="16">
              <component :is="item"></component>
            </el-icon>
            <span class="text-gray-500"> {{ item }}</span>
          </div>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script setup>
const IconList = ref({});
const icons = computed(() => Object.keys(IconList.value));

const loadIcons = async () => {
  const module = await import("@element-plus/icons-vue");
  IconList.value = module;
};

loadIcons();

const iconModel = defineModel("icon", {
  type: String,
  required: true,
});

const hanlerChange = (icon) => {
  iconModel.value = icon;
};
</script>

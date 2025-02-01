<template>
  <el-row :gutter="10" class="my-2">
    <!-- 默认 -->
    <el-col :span="8">
      <slot name="default" />
    </el-col>

    <el-col :span="8" :offset="8">
      <div class="flex items-center justify-end">
        <el-button type="primary" size="default" @click="$emit('search')"
          >搜索</el-button
        >
        <el-button size="default" @click="$emit('reset')">重置</el-button>
        <el-button
          v-if="hasAdvance"
          type="primary"
          size="default"
          text
          @click="advancedSearch = !advancedSearch"
        >
          {{ advancedSearch ? "收起" : "展开" }}
          <el-icon v-if="advancedSearch">
            <ArrowUp />
          </el-icon>
          <el-icon v-else>
            <ArrowDown />
          </el-icon>
        </el-button>
      </div>
    </el-col>

    <!-- 高级搜索 -->

    <template v-if="advancedSearch">
      <slot name="advance"></slot>
    </template>
  </el-row>
</template>

<script setup>
defineEmits(["search", "reset"]);
const slots = useSlots();
const hasAdvance = ref(!!slots.advance);
const advancedSearch = ref(false);
</script>

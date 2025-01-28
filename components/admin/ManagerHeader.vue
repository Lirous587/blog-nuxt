<template>
  <!-- search -->
  <div class="mb-2">
    <el-input
      placeholder="请输入关键字"
      v-model="value"
      class="!w-[45%]"
    ></el-input>
  </div>
  <!-- create -->
  <div>
    <el-button type="primary" @click="handleCreatePre">添加 </el-button>
  </div>
</template>

<script setup></script>

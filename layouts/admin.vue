<template>
  <el-container class="transition-all duration-300 bg-white dark:bg-black">
    <el-aside width="200px">
      <AdminNavAside></AdminNavAside>
    </el-aside>
    <el-container>
      <el-header>
        <AdminNavHeader> </AdminNavHeader>
      </el-header>
      <el-main
        class="h-[100vh] transition-all duration-300 bg-white dark:bg-black"
        ><slot
      /></el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
:deep(.el-header) {
  @apply h-auto p-0;
}

:deep(.el-menu),
:deep(.el-card__header),
:deep(.el-card__body),
:deep(.el-card),
:deep(.el-table__cell) {
  @apply bg-white dark:bg-black dark:border-gray-700 dark:text-neutral-200;
}
:deep(.el-card__body) {
  padding: 0 !important;
}

:deep(.el-input__wrapper) {
  @apply bg-white dark:bg-black dark:border-gray-700 dark:text-neutral-300;
  box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.1);
}
:deep(.el-textarea__inner) {
  @apply bg-white dark:bg-black dark:border-gray-700 dark:text-neutral-300;
  box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.1);
}
</style>

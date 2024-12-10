<template>
  <div
    class="transition-all duration-300 bg-white dark:bg-black flex h-[100vh]"
  >
    <aside class="w-[200px]">
      <AdminNavAside></AdminNavAside>
    </aside>

    <main
      class="flex-1 w-[0px] mx-5 !py-0 transition-all duration-300 bg-white dark:bg-black"
    >
      <header class="h-[30px] my-2">
        <AdminNavHeader> </AdminNavHeader>
      </header>
      <slot />
    </main>
  </div>
</template>

<style scoped>
:deep(.el-header) {
  @apply h-auto p-0;
}

:deep(.el-menu),
:deep(.el-card__header),
:deep(.el-card__body),
:deep(.el-card),
:deep(.el-table__cell),
:deep(.el-table__empty-block),
:deep(.el-dialog) {
  @apply bg-white dark:!bg-black dark:!border-gray-700 dark:!text-neutral-200;
}
:deep(.el-card__body) {
  padding: 0 !important;
}

:deep(.el-input__wrapper),
:deep(.el-textarea__inner) {
  @apply bg-white dark:bg-black dark:border-gray-700 dark:text-neutral-300;
}
:deep(.el-select__wrapper) {
  @apply bg-white dark:bg-black dark:border-gray-700 dark:text-neutral-300;
}
</style>

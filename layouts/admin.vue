<template>
  <div
    class="transition-all duration-300 bg-white dark:bg-black min-h-[100vh] flex"
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

:deep(.el-card__body) {
  padding: 0 !important;
}
</style>

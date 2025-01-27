<template>
  <div class="transition-all duration-300 bg-white dark:bg-black min-h-[100vh]">
    <header>
      <AdminNavHeader @expand="handelExpand" @collapse="handelCollapse">
      </AdminNavHeader>
    </header>
    <div class="flex">
      <aside :style="{ width: `${asideAside}` }">
        <AdminNavAside ref="navAsideRef"></AdminNavAside>
      </aside>
      <main
        class="flex-1 w-[0px] mx-5 !py-0 transition-all duration-300 bg-white dark:bg-black"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const navAsideRef = ref(null);
const asideAside = ref("150px");

const handelExpand = () => {
  asideAside.value = "150px";
  navAsideRef.value.expand();
};

const handelCollapse = () => {
  asideAside.value = "80px";
  navAsideRef.value.collapse();
};
</script>

<!-- <style scoped>
:deep(.el-header) {
  @apply h-auto p-0;
}

:deep(.el-card__body) {
  padding: 0 !important;
}
</style> -->

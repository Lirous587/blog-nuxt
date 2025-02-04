<template>
  <div class="min-h-[100vh]">
    <header>
      <AdminNavHeader @expand="handleExpand" @collapse="handleCollapse">
      </AdminNavHeader>
    </header>
    <div class="flex">
      <aside :style="{ width: `${asideAside}` }">
        <AdminNavAside ref="navAsideRef"></AdminNavAside>
      </aside>
      <main class="flex-1 mt-2 w-[0px] mx-5">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const navAsideRef = ref(null);
const asideAside = ref("150px");

const handleExpand = () => {
  asideAside.value = "150px";
  navAsideRef.value.expand();
};

const handleCollapse = () => {
  asideAside.value = "80px";
  navAsideRef.value.collapse();
};
</script>

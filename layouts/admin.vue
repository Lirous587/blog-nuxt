<template>
  <el-container>
    <el-aside width="auto">
      <AdminNavAside></AdminNavAside>
    </el-aside>
    <el-container>
      <el-main><slot /> </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.nav-main {
  transition: all 0.5s linear;
}
</style>

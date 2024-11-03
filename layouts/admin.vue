<template>
  <el-container>
    <el-aside width="200px" class="h-screen">
      <AdminNavAside></AdminNavAside>
    </el-aside>
    <el-container>
      <el-main><slot /></el-main>
    </el-container>
  </el-container>
</template>

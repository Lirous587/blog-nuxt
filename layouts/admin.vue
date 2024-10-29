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

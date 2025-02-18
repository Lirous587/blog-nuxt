<template>
  <div>
    <el-popconfirm
      title="是否退出登录"
      :hide-after="0"
      confirm-button-text="确认"
      cancel-button-text="取消"
      @confirm="handleLogout"
    >
      <template #reference> 退出登录 </template>
    </el-popconfirm>
  </div>
</template>

<script setup>
import { logout } from "~/api/user";

const router = useRouter();

const handleLogout = () => {
  logout().then(() => {
    toast("退出登录成功");
    removeUserAuth();
    router.push("/user/auth");
  });
};
</script>

<style></style>

<template>
  <div class="flex items-center justify-center">
    <el-button v-if="!userInfo" type="primary" size="small" @click="gotoLogin"
      >登录</el-button
    >
    <div>
      <el-dropdown>
        <el-avatar
          :size="32"
          :src="imgPre + userInfo?.avatar"
          @click="drawerRef.open()"
        ></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="drawerRefForUpdateInfo.open()"
              >修改信息</el-dropdown-item
            >
            <el-dropdown-item @click="drawerRefForRetPwd.open()"
              >修改密码</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <MyDrawer title="用户信息" ref="drawerRefForUpdateInfo">
    <el-form>
      <el-form-item label="用户名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </MyDrawer>
  <MyDrawer title="用户信息" ref="drawerRefForRetPwd">
    <el-form>
      <el-form-item label="用户名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </MyDrawer>
</template>

<script setup>
import { userAuth } from "~/api/user";
const router = useRouter();
const imgPre = useRuntimeConfig().public.imgBase + "/";

const drawerRefForUpdateInfo = ref(null);
const drawerRefForRetPwd = ref(null);

const userInfo = ref({});

const updateForm = reactive({
  name: "",
  avatar: "",
});

const resetPwdForm = reactive({
  password: "",
  rePassword: "",
});

const gotoLogin = () => {
  router.push("/user/auth");
};

const initUserInfo = async () => {
  if (!!getUserAccessToken()) {
    await userAuth()
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        removeUserInfo("");
      });
    userInfo.value = getUserInfo();
  }
};

onMounted(() => {
  initUserInfo();
});
</script>

<style></style>

<template>
  <div class="flex items-center justify-center">
    <el-button
      v-if="!userInfo"
      type="primary"
      size="small"
      @click="router.push('/user/auth')"
      >登录</el-button
    >
    <div v-else>
      <el-dropdown :hide-on-click="false" trigger="click">
        <el-avatar :size="32" :src="imgPre + userInfo?.avatar"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handelOpenUpdateDrawer"
              >修改信息</el-dropdown-item
            >
            <el-dropdown-item @click="drawerRefForRetPwd.open()"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item>
              <el-popconfirm
                title="是否退出登录"
                :hide-after="0"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="handelLogout"
              >
                <template #reference> 退出登录 </template>
              </el-popconfirm>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <MyDrawer title="修改信息" size="320px" ref="drawerRefForUpdateInfo">
    <el-form :model="updateForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="updateForm.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="updateForm.avatar"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handelUpdateInfo">
          更新信息
        </el-button>
      </el-form-item>
    </el-form>
  </MyDrawer>
  <MyDrawer title="修改密码" size="320px" ref="drawerRefForRetPwd">
    <el-form :model="resetPwdForm" label-width="80px">
      <el-form-item label="密码">
        <el-input
          type="password"
          show-password
          v-model="resetPwdForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码">
        <el-input
          type="password"
          show-password
          v-model="resetPwdForm.rePassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="handelUpdatePwd">
          更新密码
        </el-button>
      </el-form-item>
    </el-form>
  </MyDrawer>
</template>

<script setup>
import { logout, updateMsg, updatePassword, userAuth } from "~/api/user";
const router = useRouter();
const imgPre = useRuntimeConfig().public.imgBase + "/";

const drawerRefForUpdateInfo = ref(null);
const drawerRefForRetPwd = ref(null);

const userInfo = ref(null);

const updateForm = reactive({
  name: "",
  avatar: "",
});

const resetPwdForm = reactive({
  password: "",
  rePassword: "",
});

const handelOpenUpdateDrawer = () => {
  for (const key in userInfo.value) {
    updateForm[key] = userInfo.value[key];
  }
  drawerRefForUpdateInfo.value.open();
};

const handelUpdateInfo = async () => {
  await updateMsg(updateForm)
    .then((res) => {
      toast("修改信息成功");
    })
    .catch((err) => {
      toast(err, "error");
    });
};

const handelUpdatePwd = async () => {
  await updatePassword(resetPwdForm)
    .then(() => {
      toast("修改密码成功");
      removeUserAuth();
      router.push("/user/auth");
    })
    .catch((err) => {
      toast(err, "error");
    });
};

const handelLogout = async () => {
  await logout().then(() => {
    toast("退出登录成功");
    removeUserAuth();
    router.push("/user/auth");
  });
};

const initUserInfo = async () => {
  if (!!getUserAccessToken()) {
    await userAuth().then((res) => {
      setUserInfo(res.data);
    });
    userInfo.value = getUserInfo();
  }
};

onMounted(() => {
  initUserInfo();
});
</script>

<style></style>

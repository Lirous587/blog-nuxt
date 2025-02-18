<template>
  <div class="flex items-center justify-center hover:cursor-pointer">
    <el-icon size="20" v-if="!ifLogin" @click="router.push('/user/auth')"
      ><User
    /></el-icon>

    <div v-else>
      <el-dropdown :hide-on-click="false" trigger="click">
        <el-avatar :size="28" :src="imgPre + userInfo.avatar"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="modifyInfoRef.open()">
              <UserModifyInfo
                ref="modifyInfoRef"
                @sumbit="handleModifyInfo"
                :user-info="userInfo"
              ></UserModifyInfo>
              修改信息
            </el-dropdown-item>
            <el-dropdown-item @click="modifyPwdRef.open()">
              <UserModifyPassword
                ref="modifyPwdRef"
                @submit="handleModifyPwd"
              ></UserModifyPassword>
              修改密码
            </el-dropdown-item>

            <el-dropdown-item>
              <UserAuthLogout></UserAuthLogout>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

const imgPre = useRuntimeConfig().public.imgAvatarBase;

const ifLogin = ref(false);

const userInfo = reactive({
  name: "",
  avatar: "",
});

const modifyInfoRef = ref(null);
const modifyPwdRef = ref(null);
const handleModifyInfo = (info) => {
  setUserInfoCookie(info);
  for (const key in info) {
    if (info[key]) {
      userInfo[key] = info[key];
    }
  }
  ifLogin.value = true;
};

const handleModifyPwd = () => {
  toast("修改密码成功");
  removeUserAuth();
  router.push("/user/auth");
};

const initUserInfo = async () => {
  await userStatusAuth();
  const info = getUserInfoFromCookie();
  if (info && Object.keys(info).length > 0) {
    for (const key in info) {
      if (info[key]) {
        userInfo[key] = info[key];
      }
    }
    ifLogin.value = true;
  }
};

onMounted(() => {
  initUserInfo();
});
</script>

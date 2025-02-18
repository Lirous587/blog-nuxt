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
              <el-popconfirm
                title="是否退出登录"
                :hide-after="0"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="handleLogout"
              >
                <template #reference> 退出登录 </template>
              </el-popconfirm>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { logout } from "~/api/user";
const router = useRouter();
const imgPre = useRuntimeConfig().public.imgAvatarBase;

const ifLogin = ref(false);

const userInfo = reactive({
  name: "",
  avatar: "",
});

const modifyInfoRef = ref(null);
const modifyPwdRef = ref(null);

const handleLogout = () => {
  logout().then(() => {
    toast("退出登录成功");
    removeUserAuth();
    resetForm(userInfo);
    router.push("/user/auth");
  });
};

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
  toast("退出登录成功");
  removeUserAuth();
  resetForm(userInfo);
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

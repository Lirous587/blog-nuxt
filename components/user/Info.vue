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
            <el-dropdown-item @click="updateInfoPre">修改信息</el-dropdown-item>
            <el-dropdown-item @click="drawerRefForRetPwd.open()"
              >修改密码</el-dropdown-item
            >
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

  <MyDrawer title="修改信息" size="320px" ref="drawerRefForUpdateInfo">
    <el-form
      ref="updateInfoFormRef"
      :model="updateInfoForm"
      :rules="updateInfoRules"
      label-width="80px"
    >
      <el-form-item label="头像" for="avatar">
        <ImgUpload v-model:imgData="updateInfoForm.imgData" size-limit="2MB">
          <template #default>
            <el-avatar size="large" :src="imgPre + userInfo.avatar"></el-avatar>
            <br />
            <small>请上传图片,内容大小不得超过2MB</small>
          </template>
          <template #preview="previewProps">
            <el-avatar size="large" :src="previewProps.previewUrl"></el-avatar>
          </template>
        </ImgUpload>
      </el-form-item>

      <el-form-item label="用户名" prop="name" for="name">
        <el-input v-model="updateInfoForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitUpdateInfo">
          更新信息
        </el-button>
      </el-form-item>
    </el-form>
  </MyDrawer>
  <MyDrawer title="修改密码" size="320px" ref="drawerRefForRetPwd">
    <el-form
      ref="updatePwdFormRef"
      :model="updatePwdForm"
      :rules="updatePwdRules"
      label-width="80px"
    >
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="updatePwdForm.password"
          type="password"
          name="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="rePassword">
        <el-input
          v-model="updatePwdForm.rePassword"
          type="password"
          show-password
          name="rePassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitUpdatePwd">
          更新密码
        </el-button>
      </el-form-item>
    </el-form>
  </MyDrawer>
</template>

<script setup>
import { logout, updateMsg, updatePassword, getUserInfo } from "~/api/user";
const router = useRouter();
const imgPre = useRuntimeConfig().public.imgAvatarBase + "/";

const drawerRefForUpdateInfo = ref(null);
const drawerRefForRetPwd = ref(null);

const ifLogin = ref(false);

const userInfo = reactive({
  name: "",
  avatar: "",
});

const updateInfoFormRef = ref(null);
const updatePwdFormRef = ref(null);
const updateInfoForm = reactive({
  name: "",
  imgData: null,
});

const updatePwdForm = reactive({
  password: "",
  rePassword: "",
});

const updateInfoRules = reactive({
  imgData: [
    {
      required: true,
      message: "请上传图片,内容大小不得超过2MB",
      trigger: "blur",
    },
  ],
  name: [
    {
      required: true,
      message: "请输入昵称,宽度应在2-15之间",
      trigger: "blur",
      min: 2,
      max: 15,
    },
  ],
});

const validatePass = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("请输入密码"));
  } else if (value.length > 30 || value.length < 6) {
    return callback(new Error("密码长度应在6-30之间"));
  } else if (updatePwdForm.rePassword !== "") {
    if (!updatePwdFormRef.value) return;
    updatePwdFormRef.value.validateField("rePassword");
  }
  callback();
};

const validateRepassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== updatePwdForm.password) {
    callback(new Error("两次输入密码不一致"));
  } else if (value.length > 30 || value.length < 6) {
    callback(new Error("密码长度应在6-30之间"));
  } else {
    callback();
  }
};

const updatePwdRules = reactive({
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
  rePassword: [
    {
      required: true,
      validator: validateRepassword,
      trigger: "blur",
    },
  ],
});

const updateInfoPre = () => {
  for (const key in userInfo) {
    updateInfoForm[key] = userInfo[key];
  }
  drawerRefForUpdateInfo.value.open();
};

const submitUpdateInfo = async () => {
  if (!updateInfoFormRef) return;
  updateInfoFormRef.value.validate((valid) => {
    if (valid) {
      handleUpdateInfo();
    }
  });
};

const submitUpdatePwd = () => {
  if (!updatePwdFormRef) return;
  updatePwdFormRef.value.validate((valid) => {
    if (valid) {
      handleUpdatePwd();
    }
  });
};

const handleUpdateInfo = async () => {
  const formData = new FormData();
  formData.append("img", updateInfoForm.imgData);
  formData.append(
    "info",
    JSON.stringify({ ...updateInfoForm, imgData: undefined })
  );
  await updateMsg(formData)
    .then(() => {
      toast("修改信息成功");
      updateaUserInfo();
    })
    .catch((err) => {
      toast(err, "error");
    });
};

const handleUpdatePwd = async () => {
  await updatePassword(updatePwdForm)
    .then(() => {
      toast("修改密码成功");
      removeUserAuth();
      router.push("/user/auth");
    })
    .catch((err) => {
      toast(err, "error");
    });
};

const handleLogout = () => {
  logout().then(() => {
    toast("退出登录成功");
    removeUserAuth();
    resetForm(userInfo);
    router.push("/user/auth");
  });
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

const updateaUserInfo = async () => {
  await getUserInfo().then((res) => {
    const info = res.data;
    setUserInfoCookie(info);
    for (const key in info) {
      if (info[key]) {
        userInfo[key] = info[key];
      }
    }
    ifLogin.value = true;
  });
};

onMounted(() => {
  initUserInfo();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-xl font-bold my-3 text-purple-300 dark:text-gray-400">
      注 册
    </h1>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      class="pr-5 w-full"
      label-width="70px"
    >
      <el-form-item label="头像" prop="imgData" for="imgData">
        <UploadImg v-model:imgData="form.imgData" size-limit="2MB">
          <template #default>
            <div class="flex items-center justify-center gap-x-2">
              <el-avatar size="large"></el-avatar>
              <small>请上传图片,内容大小不得超过2MB</small>
            </div>
          </template>
          <template #preview="previewProps">
            <el-avatar size="large" :src="previewProps.previewUrl"></el-avatar>
          </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="昵称" prop="name" for="name">
        <el-input v-model="form.name" name="name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" for="email">
        <el-input type="email" v-model="form.email" name="email" />
      </el-form-item>
      <el-form-item label="验证码" prop="validationCode" for="validationCode">
        <el-input v-model="form.validationCode" name="validationCode">
          <template #suffix>
            <el-button
              :loading="sentCodeBtnLoading"
              @click="handelSentSignupValidationCode"
              size="small"
              :class="
                hasSentCode ? 'pointer-events-none cursor-not-allowed' : ''
              "
              :type="hasSentCode ? 'warning' : 'success'"
            >
              {{ hasSentCode ? `${waitTime}s` : "获取" }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" for="password">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          name="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="rePassword" for="rePassword">
        <el-input
          v-model="form.rePassword"
          type="password"
          show-password
          name="rePassword"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="signupBtnLoading"
          class="w-full mx-auto !rounded-3xl"
          size="large"
          type="primary"
          @click="sumbitSignup"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>

    <slider-validation
      ref="slideValidationRef"
      @confirm="handelSlideConfirm"
    ></slider-validation>
  </div>
</template>

<script setup>
import { sentSignupValidationCode, signup } from "~/api/user";

const slideValidationRef = ref(null);
const formRef = ref(null);

const form = reactive({
  imgData: null,
  name: "",
  email: "",
  validationCode: "",
  password: "",
  rePassword: "",
});

const signupBtnLoading = ref(false);

const hasSentCode = ref(false);
const waitTime = ref(60);
const sentCodeBtnLoading = ref(false);

const validationCodeTimer = () => {
  let timer = setInterval(() => {
    waitTime.value -= 1;
    if (waitTime.value === 0) {
      hasSentCode.value = false;
      waitTime.value = 60;
      clearInterval(timer);
    }
  }, 1000);
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("请输入密码"));
  } else if (value.length > 30 || value.length < 6) {
    return callback(new Error("密码长度应在6-30之间"));
  } else if (form.rePassword !== "") {
    if (!formRef.value) return;
    formRef.value.validateField("rePassword");
  }
  callback();
};

const validateRepassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== form.password) {
    callback(new Error("两次输入密码不一致"));
  } else if (value.length > 30 || value.length < 6) {
    callback(new Error("密码长度应在6-30之间"));
  } else {
    callback();
  }
};
const validateValidationCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("请输入验证码"));
  }
  callback();
};

const rules = reactive({
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
  email: [
    {
      required: true,
      message: "请输入邮箱地址",
      trigger: "blur",
      type: "email",
    },
  ],
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
  validationCode: [
    { required: true, validator: validateValidationCode, trigger: "blur" },
  ],
});

const sumbitSignup = () => {
  if (!formRef) return;
  formRef.value.validate((valid) => {
    if (valid) {
      slideValidationRef.value.open();
    } else {
      ElMessage.error("信息填写有误");
    }
  });
};

const handelSentSignupValidationCode = async () => {
  let ok = false;
  let validate = formRef.value.validateField("email");
  await validate
    .then(() => {
      ok = true;
    })
    .catch((err) => {
      ElMessage.error("邮箱输入错误");
    });
  if (!ok) return;
  sentCodeBtnLoading.value = true;
  sentSignupValidationCode(form)
    .then(() => {
      hasSentCode.value = true;
      sentCodeBtnLoading.value = false;
      validationCodeTimer();
    })
    .catch(() => {
      toast("验证码发送失败,请稍后重试", "waring");
    });
};

const handelSlideConfirm = () => {
  handelSignup();
};

const handelSignup = async () => {
  signupBtnLoading.value = true;
  const formData = new FormData();
  formData.append("img", form.imgData);
  formData.append("info", JSON.stringify({ ...form, imgData: undefined }));
  await signup(formData)
    .then(() => {
      toast("注册成功");
      resetForm(form);
      emits("signup");
    })
    .catch(() => {
      toast("注册失败,身份验证错误", "error");
    })
    .finally(() => {
      signupBtnLoading.value = false;
    });
};

const emits = defineEmits(["signup"]);
</script>

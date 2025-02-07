<template>
  <div>
    <h1
      class="text-xl text-center font-bold my-3 text-purple-300 dark:text-gray-400"
    >
      找回密码
    </h1>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="email" for="email">
        <el-input
          type="email"
          v-model="form.email"
          name="email"
          placeholder="邮箱"
        >
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="validationCode" for="validationCode">
        <el-input
          v-model="form.validationCode"
          name="validationCode"
          placeholder="验证码"
        >
          <template #prefix>
            <el-icon><ChatLineRound /></el-icon>
          </template>
          <template #suffix>
            <el-button
              :loading="sentCodeBtnLoading"
              @click="handleSentResetPwdValidationCode"
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
      <el-form-item prop="password" for="password">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          name="password"
          placeholder="密码"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="rePassword" for="rePassword">
        <el-input
          v-model="form.rePassword"
          type="password"
          show-password
          name="rePassword"
          placeholder="重复密码"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="resetPasswordBtnLoading"
          class="w-full mx-auto !rounded-3xl"
          size="large"
          type="primary"
          @click="sumbitSignup"
        >
          找回密码
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { sentResetPasswordValidationCode, resetPassword } from "~/api/user";

const formRef = ref(null);

const form = reactive({
  name: "",
  email: "",
  validationCode: "",
  password: "",
  rePassword: "",
});

const resetPasswordBtnLoading = ref(false);

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
      trigger: "blur",
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
      handleResetPwd();
    } else {
      ElMessage.error("信息填写有误");
    }
  });
};

const handleSentResetPwdValidationCode = async () => {
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
  sentResetPasswordValidationCode(form)
    .then(() => {
      hasSentCode.value = true;
      sentCodeBtnLoading.value = false;
      validationCodeTimer();
    })
    .catch(() => {
      toast("验证码发送失败,请稍后重试", "waring");
    });
};

const handleResetPwd = async () => {
  resetPasswordBtnLoading.value = true;
  await resetPassword(form)
    .then(() => {
      toast("重置密码成功");
      resetForm(form);
      emits("resetPassword");
    })
    .catch(() => {
      toast("重置密码失败,身份验证错误", "error");
    })
    .finally(() => {
      resetPasswordBtnLoading.value = false;
    });
};

const emits = defineEmits(["resetPassword"]);
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-xl font-bold my-3 dark:!text-gray-400">注 册</h1>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      class="pr-5 w-full"
      label-width="80px"
    >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="form.email" />
      </el-form-item>
      <el-form-item label="验证码" prop="validationCode">
        <el-input v-model="form.validationCode">
          <template #suffix>
            <el-button
              :loading="sentCodeBtnLoading"
              @click="handelSentSignupValidationCode"
              size="small"
              :class="
                hasSentCode ? 'pointer-events-none cursor-not-allowed' : ''
              "
              :type="hasSentCode ? 'info' : 'success'"
            >
              {{ hasSentCode ? `请${waitTime}s后再次发送` : "获取验证码" }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          show-password
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="rePassword">
        <el-input
          type="password"
          show-password
          v-model="form.rePassword"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          :loading="signupBtnLoading"
          class="w-[80%] mx-auto !rounded-3xl"
          size="large"
          type="primary"
          @click="sumbitSignup"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { sentSignupValidationCode, signup } from "~/api/user";

const formRef = ref(null);

const form = reactive({
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
      clearInterval(timer);
    }
  }, 1000);
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  }
  if (value.length > 30 || value.length < 6) {
    callback(new Error("密码长度应在6-30之间"));
  }
  callback();
};
const validateRepassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (form.rePassword !== form.password) {
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
  name: [
    {
      required: true,
      message: "请输入昵称,宽度应在2-10之间",
      trigger: "blur",
      min: 2,
      max: 10,
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
      trigger: "blur",
    },
  ],
  rePassword: [
    { required: true, validator: validateRepassword, trigger: "change" },
  ],
  validationCode: [
    { required: true, validator: validateValidationCode, trigger: "change" },
  ],
});

const sumbitSignup = () => {
  if (!formRef) return;
  formRef.value.validate((valid) => {
    if (valid) {
      handelSignup();
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

const handelSignup = async () => {
  signupBtnLoading.value = true;
  await signup(form)
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

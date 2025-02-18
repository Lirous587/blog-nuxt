<template>
  <div>
    <h1
      class="text-xl text-center font-bold my-3 text-purple-300 dark:text-gray-400"
    >
      找回密码
    </h1>
    <el-form ref="formRef" :model="form" :rules="rules" v-if="form">
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
        <Validation
          v-model:validationCode="form.validationCode"
          ref="validationCodeRef"
          @sent="handleSentVC"
          :validator="validator"
        ></Validation>
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
          :loading="btnLoading"
          class="w-full mx-auto !rounded-3xl"
          size="large"
          type="primary"
          @click="sumbitResetPwd"
        >
          找回密码
        </el-button>
      </el-form-item>
    </el-form>
    <slider-validation
      ref="slideValidationRef"
      @confirm="handleResetPwd"
    ></slider-validation>
  </div>
</template>

<script setup>
import { sentResetPwdVC, resetPwd } from "~/api/user";

const { formRef, form, rules } = initUserValidator();

const validationCodeRef = ref(null);
const slideValidationRef = ref(null);

const btnLoading = ref(false);

const validator = () => {
  return sentResetPwdVC(form);
};

const handleSentVC = async () => {
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
  validationCodeRef.value.sumbit();
};

const sumbitResetPwd = () => {
  if (!formRef) return;
  formRef.value.validate((valid) => {
    if (valid) {
      slideValidationRef.value.open();
    } else {
      ElMessage.error("信息填写有误");
    }
  });
};

const handleResetPwd = async () => {
  btnLoading.value = true;
  await resetPwd(form)
    .then(() => {
      toast("重置密码成功");
      resetForm(form);
      emits("resetPassword");
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

const emits = defineEmits(["resetPassword"]);
</script>

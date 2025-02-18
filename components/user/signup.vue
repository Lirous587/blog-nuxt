<template>
  <div>
    <h1
      class="text-xl text-center font-bold my-1 text-purple-300 dark:text-gray-400"
    >
      注 册
    </h1>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      class="w-full"
      v-if="form"
    >
      <el-form-item prop="imgData" for="imgData">
        <ImgUpload v-model:imgData="form.imgData" size-limit="3MB">
          <template #default>
            <div class="flex items-center justify-center gap-x-2">
              <el-avatar size="large"></el-avatar>
            </div>
          </template>
          <template #preview="previewProps">
            <el-avatar size="large" :src="previewProps.previewUrl"> </el-avatar>
          </template>
        </ImgUpload>
      </el-form-item>
      <el-form-item prop="name" for="name">
        <el-input v-model="form.name" name="name" placeholder="用户名">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
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
          @click="sumbitSignup"
        >
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <slider-validation
      ref="slideValidationRef"
      @confirm="handleSignup"
    ></slider-validation>
  </div>
</template>

<script setup>
import { sentSignupVC, signup } from "~/api/user";

const { formRef, form, rules } = initUserValidator();

const validationCodeRef = ref(null);

const slideValidationRef = ref(null);

const btnLoading = ref(false);

const validator = () => {
  return sentSignupVC(form);
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

const handleSignup = async () => {
  btnLoading.value = true;
  const formData = new FormData();
  formData.append("img", form.imgData);
  formData.append("info", JSON.stringify({ ...form, imgData: undefined }));
  await signup(formData)
    .then(() => {
      toast("注册成功");
      resetForm(form);
      emits("signup");
    })
    .finally(() => {
      btnLoading.value = false;
    });
};

const emits = defineEmits(["signup"]);
</script>

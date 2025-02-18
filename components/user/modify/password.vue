<template>
  <MyDrawer title="修改密码" size="320px" ref="drawerRef" @submit="submit">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          name="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="rePassword">
        <el-input
          v-model="form.rePassword"
          type="password"
          show-password
          name="rePassword"
        ></el-input>
      </el-form-item>
    </el-form>
  </MyDrawer>
</template>

<script setup>
import { updatePassword } from "~/api/user";

const drawerRef = ref(null);

const { formRef, form, rules } = initUserValidator();

const submit = () => {
  if (!formRef) return;
  formRef.value.validate((valid) => {
    if (valid) {
      handleUpdate();
    }
  });
};

const handleUpdate = async () => {
  await updatePassword(form)
    .then(() => {
      emits("submit");
    })
    .catch((err) => {
      toast(err, "error");
    });
};

const emits = defineEmits(["submit"]);

const open = () => {
  drawerRef.value.open();
};

defineExpose({
  open,
});
</script>

<template>
  <MyDrawer title="修改信息" size="320px" ref="drawerRef" @submit="submit">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      v-if="userInfo"
    >
      <el-form-item label="头像" for="avatar">
        <ImgUpload v-model:imgData="form.imgData" size-limit="3MB">
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
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </MyDrawer>
</template>

<script setup>
import { updateMsg, getUserInfo } from "~/api/user";
const imgPre = useRuntimeConfig().public.imgAvatarBase;

const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
  },
});

const drawerRef = ref(null);

const formRef = ref(null);
const form = reactive({
  name: props.userInfo.name || "",
  imgData: null,
});

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
});

const submit = async () => {
  if (!formRef) return;
  formRef.value.validate((valid) => {
    if (valid) {
      handleUpdate();
    }
  });
};

const handleUpdate = async () => {
  const formData = new FormData();
  formData.append("img", form.imgData);
  formData.append("info", JSON.stringify({ ...form, imgData: undefined }));
  await updateMsg(formData)
    .then(() => {
      toast("修改信息成功");
      updateUserInfo();
    })
    .catch((err) => {
      toast(err, "error");
    });
};

const updateUserInfo = async () => {
  await getUserInfo().then((res) => {
    const info = res.data;
    emits("sumbit", info);
  });
};

const emits = defineEmits(["sumbit"]);

const open = () => {
  drawerRef.value.open();
};

defineExpose({
  open,
});
</script>

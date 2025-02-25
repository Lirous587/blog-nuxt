<template>
  <div>
    <div class="flex items-center gap-x-4">
      <h2
        class="font-bold text-2xl text-center text-blue-300 dark:text-pink-400"
      >
        友链申请与修改
      </h2>
      <div
        class="w-[48px] h-[48px] hover:cursor-pointer"
        @click="handleSubmitPre"
      >
        <MyIconEnvelope
          class="origin-center hover:rotate-90 hover:scale-120 transition-transform duration-500"
        ></MyIconEnvelope>
      </div>
    </div>
    <el-dialog
      :title="title + status"
      width="70%"
      v-model="dialogVisible"
      center
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="网站名" prop="siteName">
          <el-input
            placeholder="网站名"
            v-model="form.siteName"
            :maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input
            placeholder="简介"
            v-model="form.introduction"
            type="textarea"
            :maxlength="70"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input
            placeholder="地址"
            v-model="form.url"
            :maxlength="40"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="logo" prop="logo">
          <el-input
            placeholder="logo"
            v-model="form.logo"
            :maxlength="100"
            show-word-limit
          >
            <template #prefix>
              <div class="py-[2px] flex items-center">
                <el-avatar :src="form.logo"></el-avatar>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="sliderValidationRef.open()"
            :disabled="status === '(正在审核)'"
            >提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <SliderValidation
      ref="sliderValidationRef"
      @confirm="handleSubmit"
    ></SliderValidation>
  </div>
</template>

<script setup>
import {
  getFriendLink,
  createFriendLink,
  updateFriendLink,
} from "~/api/friendLink";

const router = useRouter();
const dialogVisible = ref(false);

const formRef = ref(null);
const form = reactive({
  id: 0,
  siteName: "",
  url: "",
  introduction: "",
  logo: "",
  status: "",
});
const rules = reactive({
  siteName: [
    { required: true, message: "请输入网站名称", trigger: "blur", max: 15 },
  ],
  url: [
    {
      required: true,
      validator: urlValidator,
      trigger: "blur",
    },
  ],
  logo: [
    {
      required: true,
      validator: urlValidator,
      trigger: "blur",
    },
  ],
  introduction: [
    {
      required: true,
      message: "请输入网站介绍",
      trigger: "blur",
    },
  ],
});

const sliderValidationRef = ref(null);

const ifRegisted = ref(false);

const title = ref("");
let fun;
const handleSubmitPre = async () => {
  if (!ifLogin) {
    toast("请先登录", "warning");
    gotoLogin("/friendLink");
    return;
  }
  await initInfo();
  dialogVisible.value = true;
  if (ifRegisted.value) {
    fun = updateFriendLink;
    title.value = "修改友链";
  } else {
    fun = createFriendLink;
    title.value = "申请友链";
  }
};

const handleSubmit = () => {
  const fun = form.id
    ? updateFriendLink(form.id, form)
    : createFriendLink(form);
  fun.then((res) => {
    toast("提交成功，请耐心等待审核");
    resetForm(form);
    dialogVisible.value = false;
  });
};

const initInfo = async () => {
  if (ifLogin) {
    await getFriendLink().then((res) => {
      const data = res.data;
      for (const key in data) {
        form[key] = data[key];
      }
      ifRegisted.value = true;
    });
  }
};

const ifLogin = userIfLogin();

const status = computed(() => {
  if (form.status === "waitAudit") {
    return "(正在审核)";
  } else if (form.status === "accept") {
    return "(申请成功)";
  } else if (form.status === "refuse") {
    return "(申请失败)";
  } else {
    return "";
  }
});
</script>

<style scoped>
:deep(.el-dialog__header span) {
  color: rgb(231, 211, 29) !important;
}
</style>

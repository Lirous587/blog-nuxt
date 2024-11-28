<template>
  <div v-loading="loading">
    <div v-for="item in list" class="text-sm">
      <div
        class="flex-1 flex items-center justify-between hover:cursor-pointer px-4 hover:bg-blue-100 leading-[56px]"
        :class="activeID == item.id ? 'text-blue-400' : ''"
        @click="handelSelect(item.id)"
      >
        <div>
          {{ item.name }}
        </div>
        <div class="flex items-center gap-x-3">
          <div @click.stop="() => {}">
            <el-icon size="16" @click="handelUpdatePre(item)"><Edit /></el-icon>
          </div>

          <div @click.stop="() => {}">
            <el-popconfirm
              title="确定删除分类?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              confirm-button-type="danger"
              cancel-button-type="primary"
              @confirm.stop="handelDelete(item.id)"
            >
              <template #reference>
                <el-icon size="16"><Close /></el-icon>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>
  </div>

  <MyDrawer
    title="修改分类名称"
    direction="rtl"
    show-close
    ref="drawerRef"
    class="dark:bg-black"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handelUPdate">修改</el-button>
      </el-form-item>
    </el-form>
  </MyDrawer>
</template>

<script setup>
import {
  deleteGalleryKind,
  getGalleryKindList,
  updateGalleryKind,
} from "~/api/galleryKind";

const list = ref([]);
const activeID = ref(1);
const loading = ref(false);
const form = reactive({
  id: 1,
  name: "",
});

const drawerRef = ref(null);
const getList = async () => {
  loading.value = true;
  await getGalleryKindList()
    .then((res) => {
      const data = res.data;
      list.value = data.list;
      handelSelect(list.value[0].id);
    })
    .finally(() => {
      loading.value = false;
    });
};

const emits = defineEmits(["changeKind"]);

const handelSelect = (id) => {
  activeID.value = id;
  emits("changeKind", Number(id));
};

const handelDelete = (id) => {
  deleteGalleryKind(id).then(() => {
    getList();
    toast("删除成功");
  });
};

const handelUpdatePre = (item) => {
  form.id = item.id;
  form.name = item.name;
  drawerRef.value.open();
};

const handelUPdate = () => {
  updateGalleryKind(form).then(() => {
    getList();
    toast("修改成功");
  });
};

defineExpose({
  getList,
});

onMounted(async () => {
  await getList();
});
</script>

<template>
  <div v-loading="loading">
    <el-menu :default-active="defaultActive" @select="handelSelect">
      <el-menu-item v-for="item in list" :index="String(item.id)">
        <div class="flex-1 flex items-center justify-between">
          <div>
            {{ item.name }}
          </div>
          <div class="flex items-center">
            <div @click.stop="() => {}">
              <el-icon size="16" @click="handelUpdatePre(item)"
                ><Edit
              /></el-icon>
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
      </el-menu-item>
    </el-menu>
  </div>
  <el-drawer
    title="修改分类名称"
    direction="rtl"
    show-close
    v-model="drawerVisiable"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handelUPdate">修改</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
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

const defaultActive = ref("");
const drawerVisiable = ref(false);

const getList = async () => {
  loading.value = true;
  await getGalleryKindList()
    .then((res) => {
      const data = res.data;
      list.value = data.list;
      defaultActive.value = String(list.value[0].id);
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
  drawerVisiable.value = true;
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

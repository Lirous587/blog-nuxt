<template>
  <div v-loading="loading" class="relative h-full">
    <div class="h-[calc(100%-40px)] overflow-y-auto">
      <div
        v-for="item in tableData"
        class="flex-1 flex items-center justify-between text-sm hover:cursor-pointer pl-4 pr-3 border-b-[1px] border-pink-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-800 py-4"
        :class="
          activeID == item.id
            ? 'text-blue-400 bg-blue-100 dark:bg-gray-800'
            : ''
        "
        @click="handleSelect(item.id)"
      >
        <div>
          {{ item.name }}
        </div>
        <div class="flex items-center gap-x-3">
          <div @click.stop="() => {}">
            <el-icon size="16" @click="handleEdit(item)"><Edit /></el-icon>
          </div>

          <div @click.stop="() => {}">
            <el-popconfirm
              title="确定删除分类?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              confirm-button-type="danger"
              cancel-button-type="primary"
              @confirm.stop="handleDelete(item.id)"
            >
              <template #reference>
                <el-icon size="16"><Close /></el-icon>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute left-0 right-0 bottom-[10px] flex justify-center">
      <el-pagination
        background
        layout="prev,next"
        :current-page="currentPage"
        @current-change="getData"
        :page-count="pages"
      />
    </div>
  </div>

  <MyDrawer
    :title="drawerTitle"
    direction="rtl"
    ref="drawerRef"
    size="50%"
    :destroy-on-close="true"
    class="dark:bg-black"
    @submit="handleSubmit"
  >
    <el-form
      :model="form"
      ref="formRef"
      label-width="80px"
      :inline="false"
      :rules="rules"
    >
      <el-form-item label="分类名" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入分类名"
          show-word-limit
          :maxlength="20"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input-number v-model="form.priority" :min="0" :max="200" />
      </el-form-item>
    </el-form>
  </MyDrawer>
</template>

<script setup>
import {
  getGalleryKindList,
  createGalleryKind,
  deleteGalleryKind,
  updateGalleryKind,
} from "~/api/gallery_kind";

const activeID = ref(0);

//  table
const { tableData, loading, currentPage, pages, getData, handleDelete } =
  useInitTable({
    getList: getGalleryKindList,
    delete: deleteGalleryKind,
    searchForm: reactive({
      page: 1,
      limit: 8,
      keyword: "",
    }),
    onGetListSuccess: (res) => {
      const list = res.list;
      tableData.value = list;
      pages.value = res.pages;
      if (Array.isArray(list) && list.length > 0) {
        let flag = false;
        // 如果list里面有activeId 就不做处理 否则默认第一条
        list.forEach((item) => {
          if (item.id === activeID.value) {
            flag = true;
            return;
          }
        });
        if (!flag) {
          handleSelect(list[0].id);
        }
      }
    },
  });

// form
const {
  drawerRef,
  form,
  formRef,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
  rules,
} = useInitForm({
  form: reactive({
    name: "",
    introduction: "",
    priority: 50,
  }),
  getData,
  create: createGalleryKind,
  update: updateGalleryKind,
  rules: {
    name: [{ required: true, message: "请输入分类名", trigger: "blur" }],
  },
});

const handleSelect = (id) => {
  emits("change", id);
  activeID.value = id;
};

watch(currentPage, async (newValue) => {
  currentPage.value = newValue;
  await getData();
  handleSelect(tableData.value[0]?.id);
});

const emits = defineEmits(["change"]);

defineExpose({
  handleCreate,
  activeID,
});
</script>

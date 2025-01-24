<template>
  <div v-loading="loading" class="relative h-full">
    <div class="h-[calc(100%-40px)] overflow-y-scroll">
      <div
        v-for="item in tableData"
        class="flex-1 flex items-center justify-between text-sm hover:cursor-pointer pl-4 pr-3 border-b-[1px] dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-800 py-4"
        :class="
          activeID == item.id
            ? 'text-blue-400 bg-blue-100 dark:bg-gray-800'
            : ''
        "
        @click="handelSelect(item.id)"
      >
        <div>
          {{ item.name }}
        </div>
        <div class="flex items-center gap-x-3">
          <div @click.stop="() => {}">
            <el-icon size="16" @click="handelEdit(item)"><Edit /></el-icon>
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
    @submit="handelSubmit"
  >
    <el-form :model="form" ref="formRef" label-width="80px" :inline="false">
      <el-form-item label="图片内容">
        <el-input v-model="form.name"> </el-input>
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

definePageMeta({
  layout: "admin",
});

const activeID = ref(0);

//  table
const { tableData, loading, currentPage, pages, getData, handelDelete } =
  useInitTable({
    getList: getGalleryKindList,
    delete: deleteGalleryKind,
    searchForm: reactive({
      page: 1,
      limit: 10,
      keyword: "",
    }),
    onGetListSuccess: (res) => {
      const list = res.list;
      if (Array.isArray(list) && list.length > 0) {
        activeID.value = res.list[0]?.id;
      }
      tableData.value = list;
      pages.value = res.pages;
    },
  });

// form
const {
  drawerRef,
  form,
  formRef,
  drawerTitle,
  handelSubmit,
  handelCreate,
  handelEdit,
} = useInitForm({
  form: reactive({
    name: "",
    introduction: "",
  }),
  getData,
  create: createGalleryKind,
  update: updateGalleryKind,
});

const handelSelect = (id) => {
  emits("change", id);
  activeID.value = id;
};

watch(currentPage, async (newValue) => {
  currentPage.value = newValue;
  await getData();
  handelSelect(tableData.value[0]?.id);
});

const emits = defineEmits(["change"]);

defineExpose({
  handelCreate,
  activeID,
});
</script>

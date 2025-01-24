<template>
  <div class="relative h-full p-2">
    <div
      class="grid h-[calc(100%-40px)] overflow-y-scroll grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6"
    >
      <div
        v-for="(item, index) in tableData"
        :key="item.id"
        class="relative h-[180px] w-full shadow-lg border overflow-hidden border-gray-200 rounded-lg dark:border-gray-700"
      >
        <el-image
          :src="imgPre + item.imgUrl"
          class="h-full w-full p-2 rounded-lg"
          fit="cover"
          lazy
        >
        </el-image>
        <div
          class="absolute bottom-0 p-1 translate-y-[-1/2] shadow-sm w-full bg-white dark:bg-gray-800"
        >
          <div
            class="absolute left-[50%] -translate-x-1/2 top-0 translate-y-[-100%] text-black text-sm bg-gray-400 opacity-90 w-full"
            size="small"
          >
            <span class="ml-2 text-red-950"> {{ item.imgUrl }}</span>
          </div>
          <!-- 选择框 -->
          <div class="flex justify-evenly">
            <el-checkbox
              v-if="ifSelect"
              v-model="item.checked"
              :value="item.url"
              size="small"
              @change="handelSelectOne(index)"
            ></el-checkbox>

            <el-button
              size="small"
              text="true"
              type="warning"
              @click="handelEdit(item)"
              >更新</el-button
            >
            <el-popconfirm
              title="确定删除图片?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              confirm-button-type="danger"
              cancel-button-type="primary"
              @confirm="handelDelete(item.id)"
            >
              <template #reference>
                <el-button size="small" text type="primary">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center absolute left-0 right-0 bottom-[10px]">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        @current-change="getData"
        :page-count="pages"
      />
    </div>
  </div>

  <div class="absolute right-10 bottom-10" v-if="ifSelect">
    <el-button type="primary" @click="handelChooseImg" class="float-right"
      >选择图片</el-button
    >
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
      <el-form-item label="图片内容" v-if="drawerTitle === '新增'">
        <UploadImg v-model:imgData="form.imgData">
          <template #default>
            <div
              class="w-[200px] h-[200px] flex items-center justify-center border rounded-md bg-red-50"
            >
              <el-icon><Plus /></el-icon>
            </div>
          </template>
          <template #preview="previewProps">
            <div
              class="w-[200px] h-[200px] flex items-center justify-center border rounded-md bg-red-50"
            >
              <el-image
                v-if="previewProps.previewUrl"
                :src="previewProps.previewUrl"
              />
              <el-icon v-else><Plus /></el-icon>
            </div>
          </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="图片url" v-if="drawerTitle !== '新增'">
        <el-input placeholder="" v-model="form.imgUrl"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input placeholder="" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
  </MyDrawer>
</template>

<script setup>
import {
  getGalleryList,
  createGallery,
  deleteGallery,
  updateGallery,
} from "~/api/gallery";

definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();
const imgPre = config.public.imgGalleryBase;
const ifSelect = inject("select");
const props = defineProps({
  kindID: {
    type: Number,
    required: true,
  },
  // 旧图片id
  oID: {
    type: Number,
    default: 0,
  },
});

//  table
const {
  tableData,
  loading,
  currentPage,
  pages,
  getData,
  handelDelete,
  searchForm,
  resetSearchForm,
} = useInitTable({
  getList: getGalleryList,
  delete: deleteGallery,
  searchForm: reactive({
    kindID: 1,
    page: 1,
    limit: 10,
    keyword: "",
  }),
  onGetListSuccess: (res) => {
    const list = res.list;
    if (Array.isArray(list)) {
      tableData.value = list.map((o) => {
        if (o.id === props.oID) {
          return { ...o, checked: true };
        } else {
          return {
            ...o,
            checked: false,
          };
        }
        return { ...o, checked: false };
      });
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
  editId,
} = useInitForm({
  form: reactive({
    kindID: props.kindID,
    imgUrl: "",
    remark: "",
    imgData: null,
  }),
  getData,
  create: createGallery,
  beforSumbit: (form) => {
    if (editId.value === 0) {
      const formData = new FormData();
      formData.append("img", form.imgData);
      formData.append("info", JSON.stringify({ ...form, imgData: undefined }));
      return formData;
    } else {
      return form;
    }
  },
  update: updateGallery,
});

const checkedItem = ref(null);
const handelSelectOne = (index) => {
  tableData.value.forEach((item, i) => {
    if (i !== index) {
      item.checked = false;
    }
  });
  checkedItem.value = tableData.value[index];
};

const emits = defineEmits(["selectImg"]);

const handelChooseImg = () => {
  emits("selectImg", checkedItem.value);
};

watch(
  () => props.kindID,
  (newVal) => {
    searchForm.kindID = newVal;
    currentPage.value = 1;
    getData();
  }
);

defineExpose({
  handelCreate,
  resetSearchForm,
  searchForm,
  getData,
});
</script>

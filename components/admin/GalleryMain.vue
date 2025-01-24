<template>
  <div class="flex flex-col items-center w-full ml-2 mt-3">
    <div
      class="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6"
    >
      <div
        v-for="(item, index) in list"
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
              @click="handelUpdatePre(item)"
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
      <MyDrawer ref="updateImgDrawerRef" title="更新图片内容">
        <div class="flex flex-col items-start gap-y-5">
          <UploadImg v-model:imgData="updateForm.imgData">
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
          <el-button type="success" @click="handelUpdate">更新</el-button>
        </div>
      </MyDrawer>
    </div>

    <div class="my-5 flex justify-center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="totalPages"
        @change="changePage"
      />
    </div>
  </div>

  <div class="absolute right-10 bottom-10" v-if="ifSelect">
    <el-button type="primary" @click="handelChooseImg" class="float-right"
      >选择图片</el-button
    >
  </div>
</template>
<script setup>
import { deleteGallery, getGalleryList, updateGallery } from "~/api/gallery";

const imgPre = useRuntimeConfig().public.imgGalleryBase;

const props = defineProps({
  kindID: {
    type: Number,
    required: true,
  },
  oID: {
    type: Number,
    default: 0,
  },
});

const ifSelect = inject("select");

const list = ref([]);
const totalPages = ref(1);
const loading = ref(false);
const queryParams = reactive({
  kindID: props.kindID,
  page: 1,
  pageSize: 10,
});

const getList = async (id) => {
  list.value = [];
  loading.value = true;
  await getGalleryList(queryParams)
    .then((res) => {
      const data = res.data;
      list.value = data.list.map((o) => {
        if (o.id === props.oID) {
          return { ...o, checked: true };
        }
        if (o.id === id) {
          return {
            ...o,
            checked: false,
            imgUrl: o.imgUrl + `?random=` + Math.floor(10000 * Math.random()),
          };
        }
        return { ...o, checked: false };
      });
      totalPages.value = data.totalPages;
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false;
      }, 200);
    });
};

const handelDelete = async (id) => {
  await deleteGallery(id);
  getList();
};

const updateForm = reactive({
  id: null,
  imgData: null,
});
const updateImgDrawerRef = ref(null);

const handelUpdatePre = (item) => {
  updateForm.id = item.id;
  updateImgDrawerRef.value.open();
};

const handelUpdate = async () => {
  const formData = new FormData();
  formData.append("img", updateForm.imgData);
  formData.append(
    "info",
    JSON.stringify({ ...updateForm, imgData: undefined })
  );
  await updateGallery(formData).then(() => {
    getList(updateForm.id);
  });
  updateImgDrawerRef.value.close();
};

const changePage = async (page) => {
  queryParams.page = page;
  getList();
};

const checkedItem = ref(null);
const handelSelectOne = (index) => {
  list.value.forEach((item, i) => {
    if (i !== index) {
      item.checked = false;
    }
  });
  checkedItem.value = list.value[index];
};

const emits = defineEmits(["selectImg"]);

const handelChooseImg = () => {
  emits("selectImg", checkedItem.value);
};

watch(
  () => props.kindID,
  (newVal) => {
    queryParams.kindID = newVal;
    totalPages.value = 1;
    getList();
  }
);

onMounted(async () => {
  await getList();
});

defineExpose({
  getList,
});
</script>

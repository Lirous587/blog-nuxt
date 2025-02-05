<template>
  <div class="flex items-start">
    <div class="p-2">
      <el-avatar
        :size="30"
        :src="avatarPre + data.fromUser?.avatar"
      ></el-avatar>
    </div>
    <div class="flex flex-col flex-1 dark:text-gray-500 gap-y-1 p-1">
      <div class="flex">
        <small
          v-if="
            data.fromUser.name === data.toUser.name || data.toUser?.name == ''
          "
        >
          {{ data.fromUser.name }}
        </small>
        <div class="flex" v-else>
          <small>
            {{ data.fromUser.name }}
          </small>
          <div class="flex items-center mx-1">
            <div
              class="border-y-[4px] border-y-transparent border-l-[8px] border-l-pink-300"
            ></div>
          </div>
          <small>
            {{ data.toUser.name }}
          </small>
        </div>
      </div>

      <span class="text-sm">
        {{ data.content }}
      </span>
      <small class="text-gray-500"> {{ formateDate(data.createTime) }}</small>
      <div class="flex gap-x-3" v-if="hadLogin || ifAdmin">
        <small
          @click="handleChoose(data)"
          v-if="data.id && data.fromUser.uid != userInfo?.uid && !ifAdmin"
          class="text-green-700 hover:cursor-pointer hover:text-blue-300"
        >
          {{ data.replayStatus ? "回复中" : "回复" }}
        </small>
        <el-popconfirm
          title="确认删除评论？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="handleDelete"
        >
          <template #reference>
            <small
              class="text-green-700 hover:cursor-pointer hover:text-blue-300"
            >
              {{ data.fromUser.uid === userInfo?.uid || ifAdmin ? "删除" : "" }}
            </small>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleteEssayCommentReply } from "~/api/essay_comment";

const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const ifAdmin = inject("admin", false);

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});

const userInfo = getUserInfoFromCookie();
const hadLogin = userIfLogin();

const emits = defineEmits(["choose", "delete"]);

const emitData = reactive({
  toUserUid: "",
  toUserName: "",
  parentID: 0,
});

const handleChoose = (item) => {
  emitData.toUserUid = item.fromUser.uid;
  emitData.toUserName = item.fromUser.name;
  emitData.parentID = item.parentID;
  emits("choose", emitData);
  item.replayStatus = true;
};

const handleDelete = () => {
  console.log(props.data);
  deleteEssayCommentReply(props.data.parentID, props.data.id).then(() => {
    emits("delete");
    ElMessage.success("删除回复成功");
  });
};
</script>

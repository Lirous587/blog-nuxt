<template>
  <div class="flex items-start" v-for="item in list">
    <div class="p-2">
      <el-avatar :size="30" :src="avatarPre + item.fromUser.avatar"></el-avatar>
    </div>
    <div class="flex flex-col flex-1 dark:text-gray-500 gap-y-1 p-1">
      <div class="flex">
        <small v-if="item.fromUser.name === item.toUser.name">
          {{ item.fromUser.name }}
        </small>
        <div class="flex" v-else>
          <small>
            {{ item.fromUser.name }}
          </small>
          <div class="flex items-center mx-1">
            <div
              class="border-y-[4px] border-y-transparent border-l-[8px] border-l-pink-300"
            ></div>
          </div>
          <small>
            {{ item.toUser.name }}
          </small>
        </div>
      </div>

      <span class="text-sm">
        {{ item.content }}
      </span>
      <small class="text-gray-500"> {{ formateDate(item.createTime) }}</small>
      <div class="flex gap-x-3" v-if="hadLogin">
        <small
          @click="handleChoose(item)"
          v-if="item.id && item.fromUser.uid != userInfo.uid"
          class="text-green-700 hover:cursor-pointer hover:text-blue-300"
        >
          {{ item.ifComment ? "回复中" : "回复" }}
        </small>
        <el-popconfirm
          title="确认删除评论？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="handelDelete(item)"
        >
          <template #reference>
            <small
              class="text-green-700 hover:cursor-pointer hover:text-blue-300"
            >
              {{ item.fromUser.uid === userInfo.uid ? "删除" : "" }}
            </small>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { deleteEssayCommentReply } from "~/api/comment";

const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  list: {
    required: true,
    type: Array,
  },
});

const userInfo = getUserInfoFromCookie();
const hadLogin = userIfLofin();

const emits = defineEmits("Choose", "Delete");

const emitData = reactive({
  toUserUid: "",
  toUserName: "",
  parentID: 0,
});

const handleChoose = (item) => {
  emitData.toUserUid = item.fromUser.uid;
  emitData.toUserName = item.fromUser.name;
  emitData.parentID = item.parentID;
  emits("Choose", emitData);
  item.ifComment = true;
};

const deleteForm = reactive({
  commentID: 0,
});
const handelDelete = (item) => {
  deleteForm.commentID = item.id;
  deleteEssayCommentReply(deleteForm).then((res) => {
    emits("Delete", item.id);
    ElMessage.success("删除评论成功");
  });
};
</script>

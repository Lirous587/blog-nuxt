<template>
  <div class="flex items-start" v-for="item in list">
    <!-- 左侧头像 -->
    <div class="p-2">
      <el-avatar :size="38" :src="avatarPre + item.avatar"></el-avatar>
    </div>
    <!-- 右侧信息 -->
    <div class="flex flex-col flex-1 dark:text-gray-500 p-1 gap-y-1">
      <span class="font-bold font-sans">
        {{ item.name }}
      </span>
      <span>
        {{ item.content }}
      </span>
      <div class="flex items-center gap-x-2 text-sm">
        <small class="text-gray-500"> 刚刚 </small>
        <small
          class="text-green-700 hover:cursor-pointer hover:text-blue-300"
          @click="handleChoose"
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
              {{ data.uid === userInfo.uid ? "删除" : "" }}
            </small>
          </template>
        </el-popconfirm>
      </div>

      <!-- replies -->
      <EssayCommentReplies
        :replyCount="data?.replyCount"
        :pid="data?.id"
        @choose="handleRepliesChoose"
        ref="repliesRef"
      ></EssayCommentReplies>

      <!-- replyStatus是否是回复中 commentStatus用来标记评论框状态  -->
      <div v-if="data.replayStatus || data.commentStatus" class="flex flex-col">
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="content">
            <el-input
              :placeholder="
                toUserName ? '正在回复' + '@' + toUserName : '请输入评论'
              "
              v-model="form.content"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 15 }"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="ml-auto mt-2">
          <el-button type="info" @click="submitCreate">回复</el-button>
        </div>
        <slider-validation
          ref="sliderValidationRef"
          @confirm="handleCreate"
        ></slider-validation>
      </div>
    </div>
  </div>
</template>

<script setup>
const avatarPre = useRuntimeConfig().public.imgAvatarBase + "/";

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>

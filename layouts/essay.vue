<template>
  <div class="bg-[rgb(242,243,245)] dark:bg-black">
    <DefaultNavHeader></DefaultNavHeader>
    <DefaultBackground>
      <DefaultTypeHeartWord />
    </DefaultBackground>

    <aside
      class="flex-shrink-0 px-3 hidden ml-5 flex-col lg:mr-3 lg:flex lg:w-[300px]"
    ></aside>
    <!-- 此处加一个w-0 通知子元素可以在父元素发生溢出 -->
    <main class="flex-1 p-5 rounded-md bg-white dark:bg-[rgb(29,30,34)]">
      <slot />
    </main>

    <!-- <div
      class="fixed z-50 bottom-0 left-0 right-0 h-[60px] pointer-events-none"
    >
      <Wave />
    </div> -->

    <!-- <DefaultRecordBottom></DefaultRecordBottom> -->
  </div>
</template>

<script setup></script>

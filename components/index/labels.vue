<template>
  <div>
    <slot></slot>
    <div class="flex flex-wrap gap-x-2 gap-y-1 transition duration-500">
      <NuxtLink
        v-for="item in list"
        :key="item.id"
        :to="'/label/' + item.id + '/1'"
        class="rounded-md transition-transform duration-500 hover:scale-110 hover:bg-violet-100 dark:hover:bg-gray-600"
      >
        <div class="relative text-sm text-slate-700 dark:text-blue-300 p-2">
          {{ item.name }}
          <span
            class="absolute top-0 right-0 text-xs text-gray-700 dark:text-blue-200"
          >
            {{ item.essayCount }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>

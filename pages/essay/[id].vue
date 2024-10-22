<template>
  <div>
    <ClientOnly>
      <Md v-model:content="essayContent"></Md>
    </ClientOnly>
  </div>
</template>

<script setup>
import { getEssay } from "~/api/essay";

const route = useRoute();
const id = route.params.id;
const essayContent = ref("");

getEssay(id).then((res) => {
  essayContent.value = res.data.content;
});
</script>

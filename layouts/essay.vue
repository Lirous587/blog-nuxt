<template>
  <div class="bg-[rgb(242,243,245)] dark:bg-black">
    <DefaultNavHeader></DefaultNavHeader>
    <DefaultBackground>
      <DefaultTypeHeartWord />
    </DefaultBackground>

    <div>
      <slot />
    </div>

    <div
      class="fixed z-50 bottom-0 left-0 right-0 h-[60px] pointer-events-none"
    >
      <Wave />
    </div>
  </div>
</template>

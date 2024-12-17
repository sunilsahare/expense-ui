<script setup>
import SideNav from "./SideNav.vue";

</script>
<template>
  <div class="row m-0 p-0">
    <div class="col-2 p-0">
      <SideNav/>
    </div>
    <div class="col-10">
      <main class="container me-0">
        <RouterView v-slot="{ Component }">
            <component :is="Component" />
        </RouterView>
      </main>
    </div>

  </div>

</template>
<style scoped></style>

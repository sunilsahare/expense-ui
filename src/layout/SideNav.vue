<script setup>
  import {useRouter} from "vue-router";
  import {useUserStore} from "../stores/userStore.js";
  import router from "../router.js";

  const userStore = useUserStore();
  const logout = () => {
    userStore.logout()
    router.replace({ path: "/login" });
  }

</script>

<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px; height: 100vh">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <span class="fs-4">Menu</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link" exact-active-class="active"> All Expenses </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/add" class="nav-link" exact-active-class="active"> Add Expense </RouterLink>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <div width="38" height="32" class="rounded-circle me-2 bg-secondary"> SS</div>
        <strong>{{ userStore.username }}</strong>
      </a>
      <ul class="dropdown-menu text-small shadow">
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li>
<!--          <a class="dropdown-item" href="#">Sign out</a>-->
          <RouterLink to="#" class="dropdown-item" exact-active-class="active" @click="logout"> Sign out </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
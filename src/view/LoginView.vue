<script setup>
import {useUserStore} from "../stores/userStore.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {AuthService} from "../services/AuthService.js";

const userStore = useUserStore();
const router = useRouter();
const userForm = ref({ username: "", password: "" });

const submitHandler = async () => {
  try {
    const response = await AuthService.login(userForm.value.username, userForm.value.password);
    console.log(response.data.responseData);
    if (response.data.responseData.token) {
      userStore.token(response.data.responseData.token);
      userStore.user(response.data.responseData.user);
      userStore.login({ username: response.data.responseData.user.fullName });
      await router.replace({path: "/"});
    } else {
      console.error("Login failed: No token received");
    }
  } catch (error) {
    console.error("Login failed:", error.response ? error.response.data : error.message);
  }
}

</script>

<template>

  <div class=" d-flex align-items-center py-4">
  <main class="form-signin m-auto">
    <form class="" style="width: 400px" @submit.prevent="submitHandler">
      <div class="form-group">
        <label class="h3 app-heading" for="emp">Expense Management App</label>
      </div>
      <h3 class="text-primary mb-3"> Sign In</h3>

      <div class="form-floating">
        <input type="text" class="form-control" id="floatingInput" placeholder="username"  v-model="userForm.username">
        <label for="floatingInput">User Name</label>
      </div>
      <div class="form-floating" style="margin-top: 10px">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="userForm.password">
        <label for="floatingPassword">Password</label>
      </div>

      <div class="form-check text-start my-3">
        <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          Remember me
        </label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      <RouterLink to="/signup" class="btn btn-outline-info w-100 py-2 mt-1"> Sign Up </RouterLink>
      <p class="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
    </form>
  </main>
  </div>
</template>

<style scoped>

</style>
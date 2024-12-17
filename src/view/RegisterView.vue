<script setup>

import {useUserStore} from "../stores/userStore.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
import {AuthService} from "../services/AuthService.js";
const message = ref(null);
const userStore = useUserStore();
const router = useRouter();
const userForm = ref({ fullName: "", username: "", password: "" });

const submitHandler = async () => {
  try {
    const response = await AuthService.registerUser(userForm.value);
    console.log('Response - ',response.data.message);
    message.value = response.data.message;
    if (response.data) {
      resetForm();
      // await router.replace({path: "/login"});
    } else {
      console.error("Login failed: No token received");
    }
  } catch (error) {
    console.error("Login failed:", error.response ? error.response.data : error.message);
  }
}

const resetForm = () => {
  userForm.value = { fullName: "", username: "", password: "" }
}

</script>

<template>

  <div class=" d-flex align-items-center py-4">
  <main class="form-signin m-auto">
    <div class="form-group">
      <label class="h3 app-heading" for="emp">Expense Management App</label>
    </div>
    <div v-if="message" class="alert alert-success" style="text-align: left"> {{message }} </div>
    <form class="" style="width: 400px" @submit.prevent="submitHandler">
      <h3 class="text-primary mb-3"> Sign Up</h3>

      <div class="form-floating py-1">
        <input type="text" required class="form-control"  v-model="userForm.fullName" id="fullName" placeholder="Full Name">
        <label for="fullName">Full Name</label>
      </div>

      <div class="form-floating py-1" style="margin-top: 10px">
        <input type="text" class="form-control" v-model="userForm.username"  id="username" placeholder="Username">
        <label for="username">Username</label>
      </div>

      <div class="form-floating py-1" style="margin-top: 10px">
        <input type="password" class="form-control" id="floatingPassword" v-model="userForm.password"  placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <button class="btn btn-primary w-100 py-2 mt-2" type="submit">Sign Up</button>
      <RouterLink to="/login" class="btn btn-outline-info w-100 py-2 mt-1"> Sign In </RouterLink>
      <p class="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
    </form>
  </main>
  </div>
</template>

<style scoped>

</style>
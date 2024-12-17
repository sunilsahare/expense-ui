<script setup>
import {computed, ref} from "vue";
import InputWithError from "./InputWithError.vue";

const expense = defineModel('expense')
const validationErrors = defineModel('validationErrors')
const props = defineProps([
  "loading",
  "formLabel",
  "submitLabel",
  "resetLabel",
]);
const emit = defineEmits(['submit', 'reset'])
const today = computed(() => new Date().toISOString().split('T')[0])

const submitHandler = () => {
  emit('submit');
}

const resetHandler = () => {
  emit('reset');
}

</script>

<template>
  <div class="card p-4" style="width: 500px;margin-right: auto;margin-left: 18px">

    <form @submit.prevent="submitHandler">
      <h3 class="text-primary p-2 alert alert-info">{{ formLabel }}</h3>
      <hr>
      <div class="row g-3 my-1">
          <InputWithError inputId="title" label="Title" v-model:task="expense.title" v-model:error="validationErrors.title" placeholder="Enter Title" />
      </div>

      <div class="row g-3 my-1">
        <InputWithError inputId="category" label="Category" v-model:task="expense.category" v-model:error="validationErrors.category" placeholder="Enter category" />
      </div>

      <div class="row g-3 my-1">
        <InputWithError type="number" inputId="amount" label="Amount" v-model:task="expense.amount" v-model:error="validationErrors.amount" placeholder="Enter Amount" />
      </div>

      <div class="row g-3 my-1">
        <InputWithError inputId="date" label="Date" v-model:task="expense.date" v-model:error="validationErrors.date" type="date" />
      </div>

      <fieldset class="form-group my-2">
        <button type="submit" class="btn btn-primary me-2 px42" :aria-busy="loading" :disabled="loading">{{ submitLabel }}</button>
        <button type="button"  class="btn btn-secondary px-4" @click="resetHandler" :aria-busy="loading" :disabled="loading">{{ resetLabel }}</button>
      </fieldset>

    </form>


  </div>


</template>

<style scoped>

</style>
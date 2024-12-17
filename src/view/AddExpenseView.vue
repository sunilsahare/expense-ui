<script setup>


import {useRouter} from "vue-router";
import {ref} from "vue";
import {useExpenseStore} from "../stores/ExpenseStore.js";
import ExpenseForm from "../components/ExpenseForm.vue";

const expenseStore = useExpenseStore()
const router = useRouter()

expenseStore.error = null;
expenseStore.success = null;

const newExpense = ref({
    expenseId : null,
    title : "",
    category : "",
    amount : 0,
    date : ""
})

const addExpense = async () => {
  await expenseStore.addExpense(newExpense.value);
  resetForm();
}

const resetForm = () => {
  newExpense.value = {
    expenseId : null,
    title : "",
    category : "",
    amount : 0,
    date : ""
  }
  expenseStore.clearErrors()
}
</script>
<template>
  <section id="expense-add">
    <h2 class="text-align-left p-2" style="text-align: left">Add Expense</h2>
    <hr>
    <div v-if="expenseStore.error" class="alert alert-danger"> {{ expenseStore.error }} </div>
    <div v-if="expenseStore.success" class="alert alert-success" style="text-align: left;
    margin-left: 20px;"> {{ expenseStore.success }} </div>
    <ExpenseForm :loading="expenseStore.loading" v-model:expense="newExpense" v-model:validationErrors="expenseStore.validationErrors" form-label="Add: Expense" submit-label="Add Expense" reset-label="Reset" @submit="addExpense" @reset="resetForm" />
  </section>
</template>
<style scoped>

</style>

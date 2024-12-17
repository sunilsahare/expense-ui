<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useExpenseStore} from "../stores/ExpenseStore.js";
import ExpenseForm from "../components/ExpenseForm.vue";

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const expenseStore = useExpenseStore()
const router = useRouter()

const editingExpense = ref(null)

const updateExpense = async () => {
    let employeeToBeUpdated = editingExpense.value;

    console.log(employeeToBeUpdated);
    await expenseStore.updateExpense(employeeToBeUpdated)
    if (!expenseStore.hasError) {
         router.push('/')
    }
}

const cancelEdit = () => {
    router.push('/')
    expenseStore.clearErrors()
}

onMounted(async () => {
  expenseStore.error = null;
  expenseStore.success = null;
    const expense = expenseStore.expenses.find(t => t.expenseId == props.id)
    if (expense) {
        editingExpense.value = { ...expense }
    } else {
      console.log("Expense not found, redirect to list")
        await router.push('/view')
    }
})
</script>
<template>
    <section id="expense-edit">
        <h2>Edit Expense</h2>
        <div v-if="expenseStore.error" style="text-align: left" class="alert alert-danger"> {{ expenseStore.error }} </div>
        <div v-if="expenseStore.success"  class="alert alert-success" style="text-align: left;
         margin-left: 20px;"> {{ expenseStore.success }} </div>
        <ExpenseForm v-if="editingExpense" :loading="expenseStore.loading" v-model:expense="editingExpense" v-model:validationErrors="expenseStore.validationErrors" form-label="Edit: Expense" submit-label="Update Expense" reset-label="Cancel" @submit="updateExpense" @reset="cancelEdit" />
    </section>
</template>
<style scoped>
</style>

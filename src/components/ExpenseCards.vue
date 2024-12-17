<template>
  <div v-if="expenses && expenses.length" class="container" style="display: -webkit-inline-box;; width: 78vh !important;">
        <article v-for="expense in expenses" :key="expense.expenseId" class="box" >
            <header>
                <h3>{{ expense.title }}</h3>
            </header>
            <hr>
            <p><strong>Amount:</strong> {{ expense.amount }}</p>
            <p><strong>Category:</strong> {{ expense.category }}</p>
            <p><strong>Date:</strong> {{ expense.date }}</p>
            <footer>
                <small><strong>Author:</strong> {{ expense.userId }}</small>
              <hr>
                <p class="grid">
                    <button :aria-busy="loading" :disabled="loading" class="btn btn-secondary" @click="() => editHandler(expense.expenseId)" aria-label="Edit"> ✏️ </button>
                    <button :aria-busy="loading" :disabled="loading" class="btn btn-danger" @click="() => deleteHandler(expense.expenseId)" aria-label="Delete"> 🗑️ </button>
                </p>
            </footer>
        </article>
    </div>

</template>
<script setup>
import {ref} from "vue";
import {useExpenseStore} from "../stores/ExpenseStore.js";
import {ExpenseService} from "../services/ExpenseService.js";
import Pagination from "../view/Pagination.vue";

const expenseStore = useExpenseStore();
const props = defineProps([
    "expenses",
    "loading"
]);

const emit = defineEmits(['editClick', 'removeClick'])

const editHandler = (id) => {
    emit('editClick', id);
}
const deleteHandler = (id) => {
    emit('removeClick', id);
}

const nextPage = () => {
  if (currentPage.value < ExpenseService.pagination.totalPages - 1) {
    fetchExpenses(currentPage.value+1);
  }
};

const previousPage = () => {
  if (currentPage.value > 0) {
    fetchExpenses(currentPage.value-1);
  }
};

const sort  = (columnName) => {
  ExpenseService.pagination.sortBy = columnName;
  ExpenseService.pagination.sortDirection = ExpenseService.pagination.sortDirection === 'asc' ? "asc" : "desc";
  fetchExpenses(currentPage.value);
}

const fetchExpenses = async (page) => {
  currentPage.value = page;
  await expenseStore.fetchExpenses(currentPage.value);
};

let currentPage = ref(0);


</script>
<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
}

.box {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.pagination {
  background: blanchedalmond;
  text-align: right;
  padding: 10px ;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
}

.box {
  text-align: left !important;
}

</style>
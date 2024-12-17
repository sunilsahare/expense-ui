<script setup>

import {ExpenseService} from "../services/ExpenseService.js";
import {ref} from "vue";
import {useExpenseStore} from "../stores/ExpenseStore.js";


const expenseStore = useExpenseStore();

const nextPage = () => {
  console.log('next page - ' , currentPage.value+1);
  if (currentPage.value < ExpenseService.pagination.totalPages - 1) {
    expenseStore.fetchExpenses(currentPage.value+1);
  }
};

const previousPage = () => {
  if (currentPage.value > 0) {
    expenseStore.fetchExpenses(currentPage.value-1);
  }
  console.log('prev page - ' , currentPage.value-1);
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

<template>
  <nav aria-label="Page navigation example mt-3" style="margin-top: 14px;background: aliceblue;padding: 16px 10px;">
    <ul class="pagination justify-content-end mb-0">
      <li class="page-item" >
        <button class="btn btn-primary" :disabled="ExpenseService.pagination.page === 0" @click="previousPage()">Prev</button>
      </li>

      <li>
        <label style="line-height: 37px;margin: 0px 22px;"> Page {{ExpenseService.pagination.page + 1 }} of {{ExpenseService.pagination.totalPages}}</label>
      </li>

      <li class="page-item">
        <button class="btn btn-primary" :disabled="ExpenseService.pagination.page === ExpenseService.pagination.totalPages-1" @click="nextPage()">Next</button>
      </li>
    </ul>
  </nav>

</template>

<style scoped>

  .pagination {
    text-align: center;
    justify-content: end;
  }

</style>
<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStorage} from '@vueuse/core';
import {useExpenseStore} from "../stores/ExpenseStore.js";
import Pagination from "./Pagination.vue";
import ExpenseCards from "../components/ExpenseCards.vue";
import Table from "../components/Table.vue";

const expenseStore = useExpenseStore()
const router = useRouter()

const showCard = useStorage('expense-view-preference', 'table');

const editExpense = (id) => {
  router.push({name: 'ExpenseEdit', params: {id}})
}

const deleteExpense = async (id) => {
  await expenseStore.deleteExpense(id)
}

onMounted(async () => {
  expenseStore.error = null;
  expenseStore.success = null;
  await expenseStore.fetchExpenses()
})

let selectedColumn = ref("");
let selectedOperation = ref("");
let filterValue = ref("");
let filters = ref([]);


const resetInput = () => {
  selectedOperation.value = "";
  filterValue.value = "";
}


const addFilter = () => {
  if (selectedColumn.value && selectedOperation.value && filterValue.value) {
    filters.value.push({
      fieldName: selectedColumn.value,
      operation: selectedOperation.value,
      value: filterValue.value,
    });
    // Reset fields
    selectedColumn.value = "";
    selectedOperation.value = "";
    filterValue.value = "";
  }
};

const removeFilter = async (index) => {
  filters.value.splice(index, 1);
  if (filters.value.length === 0) {
    await expenseStore.fetchExpenses(0, filters.value);
  }
}
const searchData = async () => {
  const f = filters.value;
  console.log('Array - >', f)
  await expenseStore.fetchExpenses(0, filters.value);
}


</script>
<template>

  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand text-primary">Expense List</a>
      <form class="d-flex" role="search">
        <h3>Expense Management System</h3>
      </form>
    </div>
  </nav>

  <section id="expense-list mb-3" style="margin-left: 10px">

    <div id="filter-component" class="filter-container">
      <label class="text-primary p-2 pb-0 ms-0" style="display: block"><h4>Advanced Filter</h4></label>
      <select v-model="selectedColumn" @change="resetInput" class="dropdown">
        <option disabled value="">Select Column</option>
        <option value="title">Title</option>
        <option value="amount">Amount</option>
        <!--  <option value="date">Date</option>-->
        <option value="category">Category</option>
      </select>

      <div class="operation-container" v-if="selectedColumn">
        <select v-model="selectedOperation" class="dropdown">
          <option disabled value="">Select Operation</option>
          <option value="EQ">Equal To (EQ)</option>
          <option value="NOT_EQ">Not Equal to (NOT_EQ)</option>
          <option value="LT" v-if="selectedColumn === 'amount' || selectedColumn === 'date'">Less Than (LT)</option>
          <option value="GT" v-if="selectedColumn === 'amount' || selectedColumn === 'date'">Greater Than (GT)</option>
          <option value="LE" v-if="selectedColumn === 'amount' || selectedColumn === 'date'">Less Than equal To (LE)
          </option>
          <option value="GE" v-if="selectedColumn === 'amount' || selectedColumn === 'date'">Greater Than equal to
            (GE)
          </option>
          <option value="LIKE">Like</option>
          <option value="NOT LIKE">Not Like</option>
        </select>
      </div>

      <div class="input-container" v-if="selectedOperation">
        <template v-if="selectedColumn === 'title' || selectedColumn === 'category'">
          <input
              type="text"
              v-model="filterValue"
              placeholder="Enter Value"
              class="input-box"
          />
        </template>
        <template v-if="selectedColumn === 'amount'">
          <input
              type="number"
              v-model="filterValue"
              placeholder="Enter Amount"
              class="input-box"
          />
        </template>
        <template v-if="selectedColumn === 'date'">
          <input type="date" v-model="filterValue" class="input-box"/>
        </template>
      </div>

      <button v-if="selectedOperation"
              @click="addFilter"
              :disabled="!filterValue || !selectedOperation"
              class="add-button ps-2 pe-2"
              style="height: -webkit-fill-available;"
      >
        +
      </button>
      <button v-if="filters.length" @click="searchData()" class="btn btn-primary" style="display: block;">Search
      </button>

    </div>

    <div v-if="filters.length" class="filters-list">
      <h5 class="ms-0">Filters:</h5>
      <div v-for="(filter, index) in filters" :key="index">
    <span class="badge text-bg-secondary ms-2">
      <strong>{{ filter.fieldName }}</strong> {{ filter.operation }} {{ filter.value }}
      <button @click="removeFilter(index)" class="remove-button">x</button>
    </span>
      </div>

    </div>


    <hr style="margin-top: 4px">
    <div style="text-align: left; font-size: 20px;" class="mb-2 ms-1">
      View as:
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" v-model="showCard" name="card" id="card" value="card">
        <label class="form-check-label" for="card">Card</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" v-model="showCard" value="table" name="table" id="table">
        <label class="form-check-label" for="table">Table</label>
      </div>
    </div>


    <div class=" p-0 m-0" style="height: 400px; overflow-y: scroll;">
      <div v-if="expenseStore.error" class="alert alert-danger" style="text-align: left"> {{ expenseStore.error }}</div>
      <div v-if="expenseStore.success" class="alert alert-success" style="text-align: left"> {{expenseStore.success }} </div>
      <ExpenseCards v-if="showCard === 'card'" :loading="expenseStore.loading" :expenses="expenseStore.expenses"
                    @edit-click="editExpense" @remove-click="deleteExpense"/>
      <Table v-if="showCard === 'table'" :loading="expenseStore.loading" :expenses="expenseStore.expenses"
             @edit-click="editExpense" @remove-click="deleteExpense"/>
    </div>

  </section>
  <Pagination/>
</template>

<style scoped>

/* Styling */
.filter-container {
  display: -webkit-box;;
  flex-direction: column;
  gap: 10px;
  justify-content: left;
}

.dropdown,
.input-box,
.add-button {
  padding: 10px;
  font-size: 16px;
  border: #89b1d5 1px solid;
  color: grey;
  border-radius: 4px;
}

.dropdown {
  width: 100%;
}

.input-container,
.operation-container {
  display: flex;
  flex-direction: column;
}

.add-button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
}

.add-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.filters-list {
  margin: 10px 16px;
  display: inline-flex;

}

.filters-list ul {
  list-style: none;
  padding: 0;
}

.filters-list li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.remove-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 2px 6px;
}

</style>
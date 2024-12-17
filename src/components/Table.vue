<script setup>

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


</script>

<template>
  <table class="table table-striped table-bordered">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Title</th>
      <th scope="col">Amount</th>
      <th scope="col">Category</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="expense in expenses" :key="expense.expenseId">
      <th scope="row">{{ expense.expenseId }}</th>
      <td>{{ expense.title }}</td>
      <td>{{ expense.amount }}</td>
      <td>{{ expense.category }}</td>
      <td>{{ expense.date }}</td>
      <td>
         <i style="color: rgba(178,194,27,0.6); margin-right: 5px; cursor: pointer" class="fa fa-pencil-square" :aria-busy="loading" @click="() => editHandler(expense.expenseId)" aria-hidden="true"></i>
         <i style="color: red;cursor: pointer" class="fa fa-trash" aria-hidden="true" :aria-busy="loading" @click="() => deleteHandler(expense.expenseId)"></i>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<style scoped>

</style>
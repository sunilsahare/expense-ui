<script setup>
const props = defineProps([
    "error",
    "type",
    "placeholder",
    "label",
    "min",
    "inputId"
]);
const task = defineModel('task')
const error = defineModel('error')


const clearError = (a) => {
    error.value = ''
}

</script>
<template>
<!--    <label v-if="label" :for="inputId">{{ label }}</label>-->
    <input v-if="type !== 'textarea'" class="form-control" v-model="task" :id="inputId" :type="type" :placeholder="placeholder" :min="min" :aria-invalid="error ? 'true' : 'false'" @input="clearError" />
    <textarea v-if="type === 'textarea'" class="form-control" v-model="task" :id="inputId" :placeholder="placeholder" :aria-invalid="error ? 'true' : 'false'" @input="clearError"></textarea>
    <small  style="text-align: left" v-if="error" class="text-danger">{{ error }}</small>

</template>

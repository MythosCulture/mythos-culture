<template>
    <div class="error-block">
        <h1>{{ errorCode }} : {{ errorTitle }}</h1>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  errorCode: {
    type: [String, Number],
    default: 404
  }
})


const errorMap = {
    400: {
        title: 'BAD REQUEST'
    },
    401: {
        title: 'UNAUTHORIZED'
    },
    403: {
        title: 'FORBIDDEN'
    },
    404: {
        title: 'NOT FOUND',
        message: 'The page you are looking for does not exist.'
    }
}

const errorData = computed(() => 
{
    return errorMap[props.errorCode] || {
        title:"Error.",
        message:"An unexpected error occured."
    }
})


const errorTitle = computed(() => errorData.value.title)
const errorMessage = computed(() => errorData.value.message)
</script>

<style>
.error-block {
    width: 400px;
    margin-top: 10px;
    padding: 10px 20px 20px 20px;
    border-radius: 5px;

    background-color: #fefded;
}
</style>
<template>
    <a class="nav-link" :href="url" target="_blank">
        {{buttonText}}
    </a>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    buttonText: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})
</script>

<style>
 .nav-link {
    margin-right: 5px;
    margin-left: 5px;
    padding: 10px;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    text-decoration: none;

    border-color: #fefded;
    background-color: #4b2530;
    color: #fefded;

    font-style: normal;
    font-weight: 400;
    font-family: 'Courier New', Courier, monospace;
 }
</style>
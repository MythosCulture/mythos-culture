<template>
    <a class="code-link" :href="url">
        <slot/>
    </a>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    url: {
        type: String
    }
})
</script>

<style>
.code-link {
    margin-right: 10px;
    padding: 9px 15px 9px 15px;
    text-transform: uppercase;
    text-decoration: none;
    background-color: #d9e3f5;
    color:  #fd5521;

    font-weight: 700;
    font-family: 'Courier New', Courier, monospace;
}
</style>
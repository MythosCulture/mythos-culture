<template>
    <div class="project-block">
        <div class="project-header">
            <h3 class="project-title">{{ title }}</h3>
            <CodeButton :url=url>Code</CodeButton>
        </div>
        <div class="project-desc">
            {{ description }}
        </div>
        <div v-if="$slots.tags" class="tag-flex">
            <slot name="tags"/>
        </div>
        <div v-if="$slots.subproject">
            <slot name="subproject"/>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CodeButton from './CodeButton.vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
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
.project-block {
    width: 400px;
    margin-top: 10px;
    padding: 10px 20px 20px 20px;
    border-radius: 5px;

    background-color: #fefded;
}
.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom-style: solid;
    border-bottom-width: 1px;

    border-bottom-color: #fd5521;
}
.project-title {
    margin-bottom: 10px;
    color: #fd5521;

    font-weight: 700;
    font-family: Arial, Helvetica, sans-serif;
}
.project-desc {
    padding-top: 5px;

    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.tag-flex {
    display: flex;
}
</style>
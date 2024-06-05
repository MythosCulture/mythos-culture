<template>
    <div class="project-subheading">
        <h4 class="subheading">{{ sketchName }}.js</h4>
        <div>
            <CodeButton url="#" @click="handleTryClick(sketchName)">Try</CodeButton>
            <CodeButton :url=url>Code</CodeButton>
        </div>
    </div>
    <div class="subheading-desc">
        {{ description }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import CodeButton from './CodeButton.vue'
import { sketch } from '../js/eventBus.js';

const props = defineProps({
    sketchName: {
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

function handleTryClick(sketchName) {
    sketch.current = sketchName
}
</script>

<style>
.project-subheading {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
    align-items: baseline;
}
.subheading {
    color: #1035a5;
    font-family: Arial, Helvetica, sans-serif;
}
.subheading-desc{
    padding-left: 10px;
    font-size: small;
    font-family: 'Courier New', Courier, monospace;
}
</style>
<template>
    <div ref="canvas" class="p5Canvas">
    </div>
</template>

<script setup>
import { watch , onMounted, ref } from 'vue';
import p5 from 'p5';
import { sketch } from '../js/eventBus.js';
import HexagonStack from '../js/HexagonStack.js';
import Triangles from '../js/Triangles.js';

const canvas = ref()

const sketchDict = {
    HexagonStack,
    Triangles
}

let p5Instance = null;
const createP5Instance = (sketchName, ref) => {
    if (p5Instance) {
        p5Instance.remove();
    }
    try {
        p5Instance = new p5(sketchDict[sketchName], ref.value)
    } catch (error) {
        console.log(error)
    }
}

onMounted(() =>{
    if (canvas.value && sketchDict[sketch['current']]) {
        createP5Instance(sketch['current'], canvas.value)
    } else {
        if (!canvas.value) {
            console.error('Canvas element not found');
        }
        if (!sketchDict[sketch['current']]) {
            console.error(`Sketch ${sketch['current']} not found in sketchDict`);
        }
    }
})

watch(() => sketch.current, (newSketch, oldSketch) => {
  if (canvas.value && sketchDict[newSketch]) {
    createP5Instance(newSketch, canvas.value);
  }
});
</script>
<style>
    .p5Canvas {
        overflow: hidden;
    }
</style>
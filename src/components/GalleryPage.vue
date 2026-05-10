<template>
  <gallery-ce ref="galleryRef" height="400px" :num-cols-to-show="3" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { registerElements } from 'vue-infinity';

//Prevent gallery-ce from mounting more than once 
if (!customElements.get('gallery-ce')) {
  registerElements();
}

const images = [
  './images/img1.png',
  './images/img2.jpeg',
  './images/img3.jpeg'
];

const galleryRef = ref(null);

onMounted(() => {
  galleryRef.value.updateImages(
    images.map(image => ({
      url: image
    }))
  );
});

</script>
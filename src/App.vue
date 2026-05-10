<template>
  <p5Canvas/>
  <NavBar/>
  <component :is="currentView"/>
</template>

<script setup>
import p5Canvas from './components/p5Canvas.vue'
import NavBar from './components/NavBar.vue';

import HomePage from './components/HomePage.vue';
import GalleryPage from './components/GalleryPage.vue';
import ErrorPage from './components/ErrorPage.vue';

import { ref , computed} from 'vue';

const routes = {
  "/":HomePage,
  "/gallery":GalleryPage
}

const currentPath = ref(window.location.hash || '#/')
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash || '#/'
})


const currentView = computed(() => {
  const path = currentPath.value.slice(1) || '/'
  return routes[path] || ErrorPage
})

</script>

<style>
body {
  margin: 0 !important;
}
</style>

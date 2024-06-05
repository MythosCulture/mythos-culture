<template>
    <div class="container">
        <ProjectBlock
        :url="mythosculture.url" 
        :title="mythosculture.title"
        :description="mythosculture.description">
          <template #tags>
            <Tag>Vue.js</Tag>
            <Tag>Webpack</Tag>
            <Tag>Webflow</Tag>
            <Tag>JavaScript</Tag>
          </template>
        </ProjectBlock>
        <ProjectBlock 
        :url="scarabrp.url" 
        :title="scarabrp.title"
        :description="scarabrp.description">
          <template #tags>
            <Tag>Java</Tag>
            <Tag>Springboot</Tag>
            <Tag>PostgreSQL</Tag>
            <Tag>MVC</Tag>
          </template>
        </ProjectBlock>
        <ProjectBlock
        :url="ravenous.url" 
        :title="ravenous.title"
        :description="ravenous.description">
        <template #tags>
            <Tag>React</Tag>
            <Tag>API Integration</Tag>
            <Tag>TypeScript</Tag>
            <Tag>JavaScript</Tag>
          </template>
        </ProjectBlock>
        <ProjectBlock
        :url="processing.url" 
        :title="processing.title"
        :description="processing.description">
            <template #tags>
              <Tag>Java</Tag>
              <Tag>JavaScript</Tag>
              <Tag>p5.js</Tag>
              <Tag>Processing</Tag>
            </template>
            <template #subproject>
                <SubProject
                :url="hexagonstack.url"
                :description="hexagonstack.description"
                :sketchName="hexagonstack.name"
                />
                <SubProject
                :url="triangles.url"
                :description="triangles.description"
                :sketchName="triangles.name"
                />
            </template>
        </ProjectBlock>
    </div>
</template>

<script setup>
import ProjectBlock from './ProjectBlock.vue';
import SubProject from './SubProject.vue';
import Tag from './Tag.vue';


const mythosculture = {
  url: 'https://github.com/MythosCulture/mythos-culture',
  title: 'MythosCulture.blog',
  description: 'Welcome to my digital portfolio, designed and built by me using Vue.js. I created this site to not only showcase my web development journey but to also display my code-art created in Processing (try my canvases below!).'
}
const scarabrp = {
  url: 'https://github.com/MythosCulture/BloomBoard',
  title: 'ScarabRP',
  description: 'A WIP personal hobby project, a collaborative story writing (roleplaying) website made using Java Springboot and PostgreSQL.'
}
const ravenous = {
  url: 'https://github.com/MythosCulture/Ravenous-ReactProject',
  title: 'Ravenous',
  description: 'Simple React web app that utilizes the Yelp Fusion API.'
}
const processing = {
  url: '/',
  title: 'Processing Canvases',
  description: 'Web canvas backgrounds written in Java for processing then converted to Javascript for use with the p5.js library.'
}

const hexagonstack = {
  name:'HexagonStack',
  url: '/',
  description: 'Generates randomized stacked honeycomb patterns as a versatile web canvas background.'
}
const triangles = {
  name:'Triangles',
  url: '/',
  description: 'Generates randomized triangle patterns.'
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
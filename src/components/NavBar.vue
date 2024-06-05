<template>
    <div class="nav">
        <h1 class="nav-title"><b>Mythos</b>Culture</h1>
        <NavButton buttonText="Github" url="https://github.com/MythosCulture"/>
        <NavButton buttonText="LinkedIn" url="https://www.linkedin.com/in/sylvester-negron-b11618149/"/>
    </div>
</template>

<script setup>
    import NavButton from './NavButton.vue';
</script>

<style>
.nav{
    display: flex;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
    justify-content: center;
    align-items: center;
    
    background-color: #4b2530;
}
.nav-title{
    padding: 0px 20px 10px 20px;
    letter-spacing: 5px;
    color: #fefded;
    font-weight: 400;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>